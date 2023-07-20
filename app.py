
from flask import Flask, render_template, request,jsonify
import sqlite3

app = Flask(__name__)

DATABASE_FILE = 'web_DB.db'

def execute_query(query, data=None):
    connection = sqlite3.connect(DATABASE_FILE)
    cursor = connection.cursor()
    if data:
        cursor.execute(query, data)
    else:
        cursor.execute(query)
    connection.commit()
    connection.close()

def query_database(query):
    connection = sqlite3.connect(DATABASE_FILE)
    cursor = connection.cursor()
    cursor.execute(query)
    data = cursor.fetchall()
    connection.close()
    return data


@app.route('/')
def register():
    return render_template("/register.html")

@app.route('/login')
def login():
    return render_template("/login.html")

@app.route('/update')
def update():
    return render_template("/update.html")

@app.route('/userlist')
def userlist():
    return render_template("/userlist.html")

@app.route('/api_register', methods=['GET', 'POST'])
def api_register():
    message = ''
    userName = request.args.get('username') if request.method == 'GET' else request.form['username']
    password = request.args.get('password') if request.method == 'GET' else request.form['password']

    sqliteConnection = sqlite3.connect('web_DB.db')
    cursor = sqliteConnection.cursor()
    print("Connected to SQLite")

    sqlite_select_query = "SELECT * from users where username=?"
    cursor.execute(sqlite_select_query,[userName])
    records = cursor.fetchall()
    if(len(records)>0):
        return jsonify({'message': 'User is already existing'}), 201
    else:
        cursor.execute(
            'INSERT INTO users(username,Password) VALUES (?,?)',
            [userName,password])
        sqliteConnection.commit()
        cursor.close()

        return jsonify({'message': 'Data insert successfully'}), 201


@app.route('/api_login', methods=['GET', 'POST'])
def api_login():
    message = ''
    userName = request.args.get('username') if request.method == 'GET' else request.form['username']
    password = request.args.get('password') if request.method == 'GET' else request.form['password']

    sqliteConnection = sqlite3.connect('web_DB.db')
    cursor = sqliteConnection.cursor()
    print("Connected to SQLite")

    sqlite_select_query = "SELECT * from users where username=? and password=?"
    cursor.execute(sqlite_select_query,[userName,password])
    records = cursor.fetchall()
    sqliteConnection.commit()
    cursor.close()
    if(len(records)>0):
        return jsonify({'message': 'User & password is valid'}), 201

    else:
        return jsonify({'error': 'User & password is invalid'}), 201


@app.route('/api_update', methods=['GET', 'POST'])
def api_update():
    message = ''
    userName = request.args.get('username') if request.method == 'GET' else request.form['username']
    password = request.args.get('password') if request.method == 'GET' else request.form['password']
    userid =  request.args.get('userid') if request.method == 'GET' else request.form['userid']
    try:

        sqlite_update_query = "update users set Password=?, username=? where id=?"
        execute_query(sqlite_update_query, (userid,password,userName))
        return jsonify({'message': 'Data update successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api_getuser', methods=['GET', 'POST'])
def api_getuser():
    message = ''

    sqlite_select_query = "SELECT * from users "
    data = query_database(sqlite_select_query)
    result = []
    for row in data:
        item = {}
        item['id'] = row[0]
        item['username'] = row[1]
        item['Firstname'] = row[2]
        item['Lastname'] = row[3]
        item['Password'] = row[4]
        item['PhoneNumber'] = row[5]

        # Add more columns as needed
        result.append(item)

    return jsonify(result)



if __name__ == '__main__':
    app.run(debug=True)