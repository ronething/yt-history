import json
from datetime import datetime
import pandas as pd
from flask import Flask, jsonify, send_from_directory
from dateutil import parser
import os

app = Flask(__name__)

def load_and_process_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    processed_data = []
    for item in data:
        if 'titleUrl' in item:
            title = item['title'].replace('Watched ', '')  # 去除 "Watched" 前缀
            processed_data.append({
                'title': title,
                'time': parser.parse(item['time']),
                'url': item['titleUrl']
            })
    
    return pd.DataFrame(processed_data)

@app.route('/api/daily-views')
def daily_views():
    df = load_and_process_data('watch-history.json')
    daily_views = df.groupby(df['time'].dt.date).size().reset_index(name='count')
    daily_views['time'] = daily_views['time'].astype(str)
    return jsonify(daily_views.to_dict(orient='records'))

@app.route('/api/top-videos')
def top_videos():
    df = load_and_process_data('watch-history.json')
    top_videos = df['title'].value_counts().head(10).reset_index()
    top_videos.columns = ['title', 'count']
    return jsonify(top_videos.to_dict(orient='records'))

@app.route('/api/video-data')
def video_data():
    df = load_and_process_data('watch-history.json')
    return jsonify(df.to_dict(orient='records'))

@app.route('/')
def serve_frontend():
    return send_from_directory('templates', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
