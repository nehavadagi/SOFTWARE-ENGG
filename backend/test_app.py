import pytest
from run import app  # assumes your Flask app is created in run.py

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_search_valid_query(client):
    response = client.get("/search?q=cat")
    assert response.status_code == 200
    data = response.get_json()
    assert "results" in data
    assert isinstance(data["results"], list)

def test_search_missing_query(client):
    response = client.get("/search")
    assert response
