import pytest
from run import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_search_with_valid_query(client):
    response = client.get("/search?q=cat")
    assert response.status_code == 200
    data = response.get_json()
    assert "results" in data
    assert isinstance(data["results"], list)

def test_search_without_query(client):
    response = client.get("/search")
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
