# This is a Python script that would be used for proxy detection
# In a real application, this would be called from the Node.js backend

import cv2
import numpy as np
import base64
import json
import sys
from datetime import datetime

# Function to detect if an image is a screenshot or photo of a screen
def detect_proxy_attempt(image_data):
    """
    Analyzes an image to determine if it's likely a screenshot or photo of a screen
    
    Parameters:
    image_data (bytes): Base64 encoded image data
    
    Returns:
    dict: Detection results with confidence score and reasons
    """
    try:
        # Decode base64 image
        image_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Initialize detection results
        is_proxy = False
        confidence = 0.0
        reasons = []
        
        # 1. Check for moiré patterns (common when taking photos of screens)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (5, 5), 0)
        edges = cv2.Canny(blur, 50, 150)
        
        # Count edge pixels
        edge_pixel_count = np.count_nonzero(edges)
        edge_density = edge_pixel_count / (img.shape[0] * img.shape[1])
        
        if edge_density > 0.15:  # Threshold determined empirically
            is_proxy = True
            confidence += 0.3
            reasons.append("Moiré pattern detected")
        
        # 2. Check for perfect alignment (screenshots have perfect alignment)
        # Use Hough Line Transform to detect straight lines
        lines = cv2.HoughLinesP(edges, 1, np.pi/180, 100, minLineLength=100, maxLineGap=10)
        
        if lines is not None:
            perfect_horizontal = 0
            perfect_vertical = 0
            
            for line in lines:
                x1, y1, x2, y2 = line[0]
                angle = np.abs(np.arctan2(y2 - y1, x2 - x1) * 180 / np.pi)
                
                # Count perfectly horizontal and vertical lines
                if angle < 1 or angle > 179:  # Nearly horizontal
                    perfect_horizontal += 1
                elif 89 < angle < 91:  # Nearly vertical
                    perfect_vertical += 1
            
            # If too many perfect lines, likely a screenshot
            if perfect_horizontal > 10 and perfect_vertical > 10:
                is_proxy = True
                confidence += 0.4
                reasons.append("Perfect alignment detected (likely screenshot)")
        
        # 3. Check for metadata (real camera images often have EXIF data)
        # In a real implementation, we would check EXIF data
        # For this demo, we'll simulate this check
        has_camera_metadata = False  # Simulated result
        
        if not has_camera_metadata:
            confidence += 0.2
            reasons.append("No camera metadata found")
        
        # 4. Check for screen reflections or glare (common in photos of screens)
        # Look for bright spots in the image
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        _, _, v = cv2.split(hsv)
        bright_spots = cv2.threshold(v, 240, 255, cv2.THRESH_BINARY)[1]
        bright_spot_count = np.count_nonzero(bright_spots)
        bright_spot_ratio = bright_spot_count / (img.shape[0] * img.shape[1])
        
        if bright_spot_ratio > 0.05:  # Threshold determined empirically
            is_proxy = True
            confidence += 0.2
            reasons.append("Screen glare detected")
        
        # Final determination based on confidence score
        if confidence >= 0.5:
            is_proxy = True
        
        return {
            "is_proxy": is_proxy,
            "confidence": round(confidence, 2),
            "reasons": reasons,
            "timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        return {
            "error": str(e),
            "is_proxy": True,  # Default to true for safety
            "confidence": 1.0,
            "reasons": ["Error processing image"],
            "timestamp": datetime.now().isoformat()
        }

# Main function to process input and return results
def main():
    # In a real implementation, we would receive the image data as input
    # For this demo, we'll simulate the process
    
    # Simulate receiving base64 encoded image data
    image_data = "simulated_base64_data"
    
    # Process the image
    result = detect_proxy_attempt(image_data)
    
    # Output the result as JSON
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
