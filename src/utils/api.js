import { headersWithToken } from "./handleResponse";
import { processResponse } from "./handleResponse";

const baseUrl = process.env.NODE_ENV === "production"
  ? "https://api.what2wear.twilightparadox.com"
  : "http://localhost:3001";


function getClothingItems() {
  return fetch(`${baseUrl}/items`).then(processResponse);
}

function addClothingItem(newItem) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headersWithToken(),
    body: JSON.stringify(newItem),
  }).then(processResponse);
}

function deleteClothingItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: headersWithToken(),
  }).then(processResponse);
}

function editProfile(data) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: headersWithToken(),
    body: JSON.stringify(data),
  }).then(processResponse);
}

function addCardLike(itemId) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: headersWithToken(),
  }).then(processResponse);
}

function removeCardLike(itemId) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: headersWithToken(),
  }).then(processResponse);
}

export {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  editProfile,
  addCardLike,
  removeCardLike,
  baseUrl
};
