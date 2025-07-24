from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/convert', methods=['POST'])
def convert_temperature():
    data = request.get_json()
    temp = float(data['temperature'])
    unit = data['unit']

    if unit == 'C':
        fahrenheit = (temp * 9/5) + 32
        kelvin = temp + 273.15
        celsius = temp
    elif unit == 'F':
        celsius = (temp - 32) * 5/9
        kelvin = celsius + 273.15
        fahrenheit = temp
    elif unit == 'K':
        celsius = temp - 273.15
        fahrenheit = (celsius * 9/5) + 32
        kelvin = temp
    else:
        return jsonify({'error': 'Invalid unit'}), 400

    return jsonify({
        'celsius': round(celsius, 2),
        'fahrenheit': round(fahrenheit, 2),
        'kelvin': round(kelvin, 2)
    })


if __name__ == '__main__':
    app.run(debug=True)
