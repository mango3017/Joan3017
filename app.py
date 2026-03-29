from flask import Flask, render_template

app = Flask(__name__, template_folder='.', static_folder='static')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/recycle')
def recycle():
    return render_template('recycle.html')

@app.route('/feedback')
def feedback():
    return render_template('feedback.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/plastics')
def plastics():
    return render_template('plastics.html')

@app.route('/result')
def result():
    return render_template('result.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

if __name__ == '__main__':
    app.run(debug=True)