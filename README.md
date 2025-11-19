# jmxjiangportfolio

![logo]([https://github.com/jmxjiang/jmxjiangportfolio/blob/master/static/favicon/logo.png?raw=true](https://github.com/jmxjiang/jmxjiangportfolio/blob/main/static/favicon/logo.png))

**⚠️ Contains flashing and shaking visual effects.**

My portfolio with a bunch of random stuff, I guess. I don't know why I created this, but here it is.

## Installation

1. Clone the repository and navigate to it:

    ```bash
    git clone https://github.com/jmxjiang/jmxjiangportfolio.git
    cd jmxjiangportfolio
    ```

2. Create venv:

    ```bash
    # On macOS/Linux
    python -m venv venv
    source venv/bin/activate 
    ```

    ```bash
    # On Windows: 
    python -m venv venv
    venv\\Scripts\\activate
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Create a .env file with the following key:

    ```env
    FLASK_KEY=RANDOM_SEQUENCE_OF_CHARACTERS
    ```

5. Run app:

    ```bash
    python app.py
    ```

6. Navigate to [http://127.0.0.1:5000](http://127.0.0.1:5000) to preview portfolio.
   To close the server, press Ctrl+C in
   the terminal. Make sure git is installed when making changes.

## LICENSE

This repository is licensed under the [MIT License](https://github.com/jmxjiang/jmxjiangportfolio/blob/master/LICENSE).
