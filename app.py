"""jaydenjmxjiang portfolio

This module runs an app that represents a portfolio, with an interface expressing the portfolio.
The script also fetches the portfolio messages to the user. To run the app, run this file and go to
http://127.0.0.1:5000 at the terminal to access the app. Press CTRL+C to stop the app.
"""
from flask import Flask, render_template, request
import json

app: Flask = Flask(__name__)
with open('dialogue.json') as f:
    dialogue: dict = json.load(f)


@app.route('/')
def home() -> str:
    """Gets the home page."""
    return render_template('index.html')


@app.route('/chat')
def chat() -> str:
    """Generates a page where users see information and decides which message is being used."""
    msg: int = request.args.get('msg', default=0, type=int)
    text: list = dialogue['intro']
    last_idx: int = len(text) - 1

    if msg < 0 or msg > last_idx:
        return render_template('error.html', images=range(20))
    return render_template(
        'chat.html',
        msg=text[msg],
        id=msg,
        is_not_last=msg < last_idx,
        is_first=msg == 0)


@app.route('/egg')
def egg() -> str:
    """Generates the page accessed by clicking the egg. This exists for some reason and don't ask me."""
    return render_template('egg.html',
                           play=request.args.get('play', default=False, type=bool),
                           clicked=request.args.get('clicked', default=False, type=bool))


@app.route('/rampage')
def rampage() -> str:
    """Generates the conversation between the computer and the egg. No questions asked."""
    msg: int = request.args.get('msg', default=0, type=int)
    text: list = dialogue['rampage']
    last_idx: int = len(text) - 1
    return render_template('rampage.html',
                           msg=text[msg],
                           id=msg,
                           is_first=msg == 0,
                           is_not_last=msg < last_idx)


@app.errorhandler(404)
def not_found(_):
    """404 error page."""
    return render_template('error.html', images=range(20)), 404


if __name__ == '__main__':
    app.run(debug=True)
