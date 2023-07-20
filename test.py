import sqlite3
from flask import Flask, jsonify, request

app = Flask(__name__)

# Replace 'your_database.db' with the path to your SQLite database file
DATABASE_FILE = 'your_database.db'

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

@app.route('/api/data', methods=['GET'])
def get_data():
    query = 'SELECT * FROM your_table;'  # Replace 'your_table' with the name of your table in the database
    data = query_database(query)

    # Convert the data to a list of dictionaries
    result = []
    for row in data:
        item = {}
        item['id'] = row[0]
        item['name'] = row[1]
        # Add more columns as needed
        result.append(item)

    return jsonify(result)

@app.route('/api/data', methods=['POST'])
def insert_data():
    try:
        data = request.json
        if data:
            # Replace 'your_table' and 'name' with appropriate table and column names in your database
            query = 'INSERT INTO your_table (name) VALUES (?);'
            execute_query(query, (data['name'],))
            return jsonify({'message': 'Data inserted successfully'}), 201
        else:
            return jsonify({'error': 'Invalid data format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/data/<int:id>', methods=['PUT'])
def update_data(id):
    try:
        data = request.json
        if data:
            # Replace 'your_table', 'name', and 'id' with appropriate table and column names in your database
            query = 'UPDATE your_table SET name = ? WHERE id = ?;'
            execute_query(query, (data['name'], id))
            return jsonify({'message': 'Data updated successfully'}), 200
        else:
            return jsonify({'error': 'Invalid data format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)