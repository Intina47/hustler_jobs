import requests
import os
import json

from bs4 import BeautifulSoup


def download_pdf(base_url, relative_url, file_path):
    download_url = base_url + relative_url
    response = requests.get(download_url)
    with open(file_path, 'wb') as f:
        f.write(response.content)

def scrape_jobs():
    base_url = "https://publicservice.go.ke"
    page = requests.get(base_url + "/index.php/recruitment")
    soup = BeautifulSoup(page.content, 'html.parser')

    job_list = soup.find_all('div', class_='pd-float')

    jobs = []
    for job in job_list:
        title = job.find('a').text
        link = job.find('a')['href']
        jobs.append({'title': title, 'link': link})

    # Handle pagination
    pagination_select = soup.find('select', id='limit')
    if pagination_select:
        all_jobs_url = base_url + '/index.php/recruitment?limit=0'  # 'All' option value is 0
        all_page = requests.get(all_jobs_url)
        all_soup = BeautifulSoup(all_page.content, 'html.parser')
        all_job_list = all_soup.find_all('div', class_='pd-float')
        for job in all_job_list:
            title = job.find('a').text
            link = job.find('a')['href']
            jobs.append({'title': title, 'link': link})

    output_directory = '../assets/pdf_files'  # Specify the directory to store downloaded PDF files
    os.makedirs(output_directory, exist_ok=True)

    for job in jobs:
        title = job['title']
        link = job['link']
        file_name = link.split(':')[-1]
        file_path = os.path.join(output_directory, file_name)
        download_pdf(base_url, link, file_path)
        job['file_name'] = file_name

    with open('../assets/jobs.json', 'w') as f:
        json.dump(jobs, f, indent=4)  # Format JSON with indentation
        print("Job done!")

scrape_jobs()
