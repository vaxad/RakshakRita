import io
import base64
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import networkx as nx
import requests
import json
import csv

def plot_to_base64(plot):
    buffer = io.BytesIO()
    plot.savefig(buffer, format='png')
    buffer.seek(0)
    plot_base64 = base64.b64encode(buffer.read()).decode('utf-8')
    return f"data:image/png;base64,{plot_base64}"

response= requests.get("https://rakshakrita0.vercel.app/api/authority/feedback")
jsondata = response.json()
data = json.loads(json.dumps(jsondata.get('feedbacks')))

csv_file_in_memory = io.StringIO()

csv_writer = csv.writer(csv_file_in_memory)

header = data[0].keys()
csv_writer.writerow(header)

for row in data:
    csv_writer.writerow(row.values())

csv_file_in_memory.seek(0)

df = pd.read_csv(csv_file_in_memory)

df.drop(columns=['_id', 'description', '__v', 'id'], inplace=True)

df['createdAt'] = pd.to_datetime(df['createdAt'])
df.loc[:, 'createdAt'] = df.loc[:, 'createdAt'].dt.date
df['createdAt'] = pd.to_datetime(df['createdAt'])

# Plot countplot
plt.figure(figsize=(8, 12))
sns.countplot(x='issue', data=df)
plt.title('Distribution of Issues')
plt.xticks(rotation=45)
count_plot_base64 = plot_to_base64(plt)
plt.close()

# Plot line plot
weekly_counts = df.groupby(df['createdAt'].dt.to_period("W")).size()
weekly_counts.index = weekly_counts.index.astype(str)
plt.figure(figsize=(8, 12))
plt.plot(weekly_counts.index, weekly_counts.values)
plt.title('Weekly Entries')
plt.xlabel('Week')
plt.ylabel('Count')
line_plot_base64 = plot_to_base64(plt)
plt.close()

# Plot pie chart
plt.figure(figsize=(8, 12))
df['issue'].value_counts().plot.pie(autopct='%1.1f%%')
plt.title('Proportion of Issues')
pie_chart_base64 = plot_to_base64(plt)
plt.close()

from sklearn.preprocessing import LabelEncoder

df_encoded = df.copy()
label_encoder = LabelEncoder()

for column in df.columns:
    if df[column].dtype == 'object':
        df_encoded[column] = label_encoder.fit_transform(df[column])

df_encoded.drop(columns=['attachment'], inplace=True)

# Plot heatmap
plt.figure(figsize=(8, 12))
sns.heatmap(df_encoded.corr(), annot=True, cmap='viridis')
plt.title('Correlation Heatmap')
heatmap_base64 = plot_to_base64(plt)
plt.close()

df_encoded = df[df.type == 'Negative Feedback']

# Plot complex heatmap
plt.figure(figsize=(8, 12))
sns.heatmap(pd.crosstab(df_encoded['type'], df_encoded['issue'], normalize='index'), cmap='plasma', annot=True)
plt.title('Heatmap of Type vs. Issue')
complex_heatmap_base64 = plot_to_base64(plt)
plt.close()

# Plot network graph
temp_df = df_encoded.dropna(subset=['issue'])
plt.figure(figsize=(8, 12))
G = nx.from_pandas_edgelist(temp_df, 'type', 'issue')
nx.draw(G, with_labels=True)
plt.title('Network Plot of Type-Issue Relationships')
network_plot_base64 = plot_to_base64(plt)
plt.close()

styleTag = """
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit&display=swap');
        
        * {
            margin: 0;
            /* outline: solid black; */
        }
        
        body {
            font-family: 'Outfit', sans-serif;
            text-align: center;
            /*background: linear-gradient(120deg,#ffb78b,#ff6000 100%) no-repeat;*/
            background-color: white;
            color: #42445D;
        }

        .details {
            text-align: start;
            width: fit-content;
            margin-inline: auto;
        }

        h1 {
            font-size: 2.6rem;
            padding-top: 1rem;
            margin-bottom: 2rem;
        }
        h2 {
            font-size: 2rem;
            margin-top: 2rem;
        }
        h3 {
            font-size: 1.5rem;
            margin-top: 2rem;
        }
        p {
            font-size: 1.2rem;
        }

        .wrapper {
            margin-inline: auto;
            width: 50vw;
            min-width: 300px;
            padding-bottom: 10vh;
            /* background-color: rgba(255,255,255,0.6);
            box-shadow: 0 0 10px black; */
        }
        
        
        .graphContainer:nth-child(even) {
            text-align: end;
        }
        .graphContainer:nth-child(odd) {
            text-align: start;
            padding: 0 0;
        }
        img{
             mix-blend-mode: multiply; 
            border-radius: 5px;
            max-width: 100%;
            height: 650px;
            /*box-shadow: 0 0 10px black;*/
            margin-top: 1rem;
        }
    </style>
"""
html_template = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Police Station Performance Report</title>
    {styleTag}     
</head>

<body>
    <div class="wrapper">

        <h1>Police Station Performance Report</h1>
        <table style="width:100%;">
        <tr>
        <th>
        <div class="details">
            <p><strong>Description:</strong> This report provides an analysis of the performance of police stations.</p>
            <p><strong>Creator:</strong> RakshakRita</p>
            <p><strong>Time Frame:</strong> 2022-2023</p>
        </div>
        
        <h2>Summary</h2>
        <p>The performance of police stations has been consistent throughout the month.</p>
    
        <h2>Plots</h2>
        <div class="graphWrapper">
            <div class="graphContainer">
                <h3>Issue Bar Graph</h3>
                <p>Bar Graph showing the count of various issues</p>
                <img src="{count_plot_base64}" alt="Issue Bar Graph">
            </div>
            
            <div class="graphContainer">
                <h3>Performance Trend</h3>
                <p>Line plot showing the trend of performance over time</p>
                <img src="{line_plot_base64}" alt="Performance Trend">
            </div>
            
            <div class="graphContainer">
                <h3>Issue Pie Chart</h3>
                <p>Pie Chart illustrating different issues</p>
                <img style="height:800px;" src="{pie_chart_base64}" alt="Issue Pie Chart">
            </div>
            
            <div class="graphContainer">
                <h3>Simple Heat Map</h3>
                <p>Heat map showing direct relation between columns</p>
                <img style="height:900px;" src="{heatmap_base64}" alt="Simple Heat Map">
            </div>
            
            <div class="graphContainer">
                <h3>Complex Heat Map</h3>
                <p>Heat map showing indirect relation between columns</p>
                <img style="height:800px;" src="{complex_heatmap_base64}" alt="Complex Heat Map">
            </div>
            
            <div class="graphContainer">
                <h3>Network Graph</h3>
                <p>Correlation between issue and type illustrated</p>
                <img style="height:800px;" src="{network_plot_base64}" alt="Network Graph">
            </div>
        </div>
        </th>
        </tr>
        </table>
    </div>
</body>
</html>
"""

import pdfkit

pdf_file_path = "report.pdf"
import os
print("Current working directory:", os.getcwd())
path_wkhtmltopdf = f"{os.getcwd()}\\lib\\wkhtmltopdf\\bin\\wkhtmltopdf.exe"
config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)


pdf_content = pdfkit.from_string(html_template, False,configuration=config, options={'page-size':'A3'})

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication

# Email configuration
sender_email = "testvaxad@gmail.com"
receiver_email = "varadprabhu111@gmail.com"
subject = "Subject of the email"
body = "Body of the email"

# Set up the MIME object
message = MIMEMultipart()
message["From"] = sender_email
message["To"] = receiver_email
message["Subject"] = subject

# Attach the body of the email
message.attach(MIMEText(body, "plain"))
pdf_attachment = MIMEApplication(pdf_content, _subtype="pdf")
pdf_attachment.add_header("Content-Disposition", "attachment", filename="report.pdf")
message.attach(pdf_attachment)

# Connect to the SMTP server (in this case, Gmail's SMTP server)
with smtplib.SMTP("smtp.gmail.com", 587) as server:
    # Start the TLS connection
    server.starttls()

    # Login to your email account
    server.login(sender_email, "atxb zxxo tbvs sbwp")

    # Send the email
    server.sendmail(sender_email, receiver_email, message.as_string())

print("Email sent successfully.")