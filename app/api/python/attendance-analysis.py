# This is a Python script that would be used for attendance analysis
# In a real application, this would be called from the Node.js backend

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
import json

# Mock data generation function
def generate_mock_attendance_data(student_id, num_days=30):
    np.random.seed(42)  # For reproducible results
    
    # Generate dates for the past num_days
    end_date = datetime.now()
    start_date = end_date - timedelta(days=num_days)
    dates = [start_date + timedelta(days=i) for i in range(num_days)]
    
    # Generate course data
    courses = ["CS101", "CS201", "CS301", "CS401"]
    course_attendance = {}
    
    for course in courses:
        # Generate random attendance (1 = present, 0 = absent)
        # With some patterns (weekends have no classes, some courses meet only certain days)
        attendance = []
        for date in dates:
            # No classes on weekends
            if date.weekday() >= 5:  # 5 = Saturday, 6 = Sunday
                attendance.append(None)
                continue
                
            # CS101 is on Monday, Wednesday, Friday
            if course == "CS101" and date.weekday() in [0, 2, 4]:
                attendance.append(np.random.choice([0, 1], p=[0.2, 0.8]))
            # CS201 is on Tuesday, Thursday
            elif course == "CS201" and date.weekday() in [1, 3]:
                attendance.append(np.random.choice([0, 1], p=[0.15, 0.85]))
            # CS301 is on Monday, Thursday
            elif course == "CS301" and date.weekday() in [0, 3]:
                attendance.append(np.random.choice([0, 1], p=[0.3, 0.7]))
            # CS401 is on Wednesday, Friday
            elif course == "CS401" and date.weekday() in [2, 4]:
                attendance.append(np.random.choice([0, 1], p=[0.25, 0.75]))
            else:
                attendance.append(None)
        
        course_attendance[course] = attendance
    
    # Create DataFrame
    df = pd.DataFrame({
        'date': dates,
        'weekday': [date.strftime('%A') for date in dates],
    })
    
    # Add course attendance columns
    for course in courses:
        df[course] = course_attendance[course]
    
    return df

# Function to calculate attendance statistics
def calculate_attendance_stats(df):
    stats = {}
    
    for column in df.columns:
        if column not in ['date', 'weekday']:
            # Calculate attendance percentage
            present = df[column].sum()
            total = df[column].count()
            percentage = (present / total * 100) if total > 0 else 0
            
            # Calculate streak (consecutive days present)
            streak = 0
            max_streak = 0
            for val in df[column].dropna():
                if val == 1:
                    streak += 1
                    max_streak = max(max_streak, streak)
                else:
                    streak = 0
            
            stats[column] = {
                'present': int(present),
                'absent': int(total - present),
                'total': int(total),
                'percentage': round(percentage, 2),
                'max_streak': int(max_streak)
            }
    
    return stats

# Function to predict future attendance
def predict_attendance(df, future_days=10):
    predictions = {}
    
    for column in df.columns:
        if column not in ['date', 'weekday']:
            # Simple prediction based on past attendance pattern
            attendance_rate = df[column].mean()
            
            # Get the days of week this course occurs
            course_days = []
            for day in range(7):
                day_data = df[df['date'].dt.weekday == day][column]
                if day_data.count() > 0:
                    course_days.append(day)
            
            # Predict future attendance
            future_dates = [df['date'].iloc[-1] + timedelta(days=i+1) for i in range(future_days)]
            future_attendance = []
            
            for date in future_dates:
                if date.weekday() in course_days:
                    # Predict based on attendance rate with some randomness
                    pred = 1 if np.random.random() < attendance_rate else 0
                    future_attendance.append({'date': date.strftime('%Y-%m-%d'), 'predicted': pred})
            
            predictions[column] = future_attendance
    
    return predictions

# Function to generate attendance report
def generate_attendance_report(student_id):
    # Generate mock data
    df = generate_mock_attendance_data(student_id)
    
    # Calculate statistics
    stats = calculate_attendance_stats(df)
    
    # Predict future attendance
    predictions = predict_attendance(df)
    
    # Calculate overall attendance
    total_present = sum(stat['present'] for stat in stats.values())
    total_classes = sum(stat['total'] for stat in stats.values())
    overall_percentage = (total_present / total_classes * 100) if total_classes > 0 else 0
    
    # Calculate classes needed to reach 75% attendance
    classes_needed = {}
    for course, stat in stats.items():
        if stat['percentage'] < 75:
            current_present = stat['present']
            current_total = stat['total']
            
            # Calculate how many more classes needed to reach 75%
            # Formula: (current_present + x) / (current_total + x) >= 0.75
            # Solving for x: x >= (0.75*current_total - current_present) / 0.25
            x = max(0, np.ceil((0.75 * current_total - current_present) / 0.25))
            classes_needed[course] = int(x)
    
    # Prepare report
    report = {
        'student_id': student_id,
        'generated_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'overall_attendance': {
            'percentage': round(overall_percentage, 2),
            'present': int(total_present),
            'total': int(total_classes),
            'absent': int(total_classes - total_present)
        },
        'course_attendance': stats,
        'classes_needed': classes_needed,
        'predictions': predictions
    }
    
    return report

# Main function
if __name__ == "__main__":
    # Generate report for a student
    report = generate_attendance_report("ST12345")
    
    # Print report as JSON
    print(json.dumps(report, indent=2))
