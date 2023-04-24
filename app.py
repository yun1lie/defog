from flask import Flask, Response
import cv2

app = Flask(__name__)

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_AUTO_EXPOSURE, 0.25)
cap.set(cv2.CAP_PROP_EXPOSURE, 0.03)
cap.set(cv2.CAP_PROP_GAIN, 0.5)
cap.set(cv2.CAP_PROP_WHITE_BALANCE_BLUE_U, 5000)
cap.set(cv2.CAP_PROP_WHITE_BALANCE_RED_V, 5000)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/video_feed')
def video_feed():
    def gen():
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            # 这里可以调用图像去雾模块对图像进行处理
            ret, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')
    return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)