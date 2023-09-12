import sys
import requests
import json
from bs4 import BeautifulSoup
from urllib.parse import urlencode

def scrape_jobs(job_title, location):
    base_url = "https://findajob.dwp.gov.uk/search"
    
    # Construct query parameters
    query_params = {
        "q": job_title,
        "w": location
    }
    
    # Encode query parameters into URL format
    url = f"{base_url}?{urlencode(query_params)}"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        job_listings = soup.find_all("div", class_="search-result")

        job_data = []

        for listing in job_listings:
            title = listing.find("h3").find("a").text.strip()
            details = listing.find("ul", class_="search-result-details").find_all("li")
            date = details[0].text.strip() if len(details) > 0 else ""
            company_location = details[1].text.strip() if len(details) > 1 else ""
            salary = details[2].text.strip() if len(details) > 2 else ""
            description = listing.find("p", class_="search-result-description").text.strip()

            job_data.append({
                "title": title,
                "date": date,
                "company_location": company_location,
                "salary": salary,
                "description": description
            })
        # return data as json
        return job_data
    else:
        print("Failed to fetch data")
        return []


if len(sys.argv) == 3:
    job_title = sys.argv[1]
    location = sys.argv[2]
    jobs = scrape_jobs(job_title, location)
    print(json.dumps(jobs))
else:
    print("Please provide job title and location as arguments")
