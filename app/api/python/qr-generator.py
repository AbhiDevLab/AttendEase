# This is a Python script that would be used for QR code generation
# In a real application, this would be called from the Node.js backend

import qrcode
import json
import base64
import io
import time
import hmac
import hashlib
import sys
from datetime import datetime, timedelta

def generate_secure_qr(data, secret_key, expiry_minutes=60):
    """
    Generate a secure QR code with embedded expiration and verification
    
    Parameters:
    data (dict): Data to encode in the QR code
    secret_key (str): Secret key for HMAC signature
    expiry_minutes (int): Minutes until QR code expires
    
    Returns:
    dict: QR code data including base64 encoded image
    """
    # Add timestamp and expiry
    timestamp = int(time.time())
    expiry = timestamp + (expiry_minutes * 60)
    
    # Create payload
    payload = {
        **data,
        "timestamp": timestamp,
        "expiry": expiry,
        "nonce": base64.b64encode(os.urandom(8)).decode('utf-8')
    }
    
    # Create signature
    payload_str = json.dumps(payload, sort_keys=True)
    signature = hmac.new(
        secret_key.encode('utf-8'),
        payload_str.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    # Final data to encode
    final_data = {
        "payload": payload,
        "signature": signature
    }
    
    # Convert to JSON string
    qr_data = json.dumps(final_data)
    
    # Generate QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(qr_data)
    qr.make(fit=True)
    
    # Create image
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Convert to base64
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
    
    # Return QR code data
    return {
        "qr_base64": img_str,
        "expiry": datetime.fromtimestamp(expiry).isoformat(),
        "valid_for_minutes": expiry_minutes
    }

def verify_qr_code(qr_data, secret_key):
    """
    Verify a QR code's authenticity and check if it's expired
    
    Parameters:
    qr_data (str): JSON string from QR code
    secret_key (str): Secret key for HMAC verification
    
    Returns:
    dict: Verification result
    """
    try:
        # Parse QR data
        data = json.loads(qr_data)
        payload = data["payload"]
        received_signature = data["signature"]
        
        # Verify signature
        payload_str = json.dumps(payload, sort_keys=True)
        expected_signature = hmac.new(
            secret_key.encode('utf-8'),
            payload_str.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        
        if received_signature != expected_signature:
            return {
                "valid": False,
                "expired": False,
                "reason": "Invalid signature"
            }
        
        # Check expiry
        current_time = int(time.time())
        expiry_time = payload["expiry"]
        
        if current_time > expiry_time:
            return {
                "valid": True,
                "expired": True,
                "reason": "QR code has expired",
                "payload": payload
            }
        
        # QR code is valid and not expired
        return {
            "valid": True,
            "expired": False,
            "payload": payload
        }
        
    except Exception as e:
        return {
            "valid": False,
            "expired": False,
            "reason": f"Error verifying QR code: {str(e)}"
        }

# Main function to process input and return results
def main():
    # Check if we're generating or verifying
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No command specified"}))
        return
    
    command = sys.argv[1]
    secret_key = "your_secret_key_here"  # In a real app, this would be securely stored
    
    if command == "generate":
        # Example data for QR code
        data = {
            "courseId": "CS101",
            "teacherId": "T12345",
            "sessionId": "S67890",
            "location": "Room 101"
        }
        
        # Generate QR code
        result = generate_secure_qr(data, secret_key, expiry_minutes=60)
        print(json.dumps(result))
        
    elif command == "verify":
        # In a real app, we would get the QR data from input
        qr_data = sys.argv[2] if len(sys.argv) > 2 else ""
        
        # Verify QR code
        result = verify_qr_code(qr_data, secret_key)
        print(json.dumps(result))
        
    else:
        print(json.dumps({"error": "Invalid command"}))

if __name__ == "__main__":
    main()
