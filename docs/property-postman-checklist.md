# Property Postman Checklist

Use the same Postman cookie jar for the whole flow because authentication is session-based.

## 1. Login as host

`POST /api/auth/login`

```json
{
  "email": "host1@mail.com",
  "password": "123456"
}
```

Expected:
- `200 OK`
- Response contains `user`
- Cookie `hs.sid` is created

## 2. Create a new property

`POST /api/host/properties`

Body type: `form-data`

Text fields:
- `title`: `Sunset Villa Da Nang`
- `description`: `Beautiful villa near My Khe beach with private pool and modern interior for family trips.`
- `type`: `Villa`
- `price`: `250`
- `address`: `12 Beach Road`
- `city`: `Da Nang`
- `country`: `Vietnam`
- `maxGuests`: `6`
- `bedrooms`: `3`
- `bathrooms`: `2`
- `amenities`: `["WiFi","Pool","Parking","Air Conditioning"]`

File fields:
- `coverImage`: 1 image file
- `detailImages`: 3 to 6 image files

Expected:
- `201 Created`
- `message = "Property created successfully."`
- `data.status = "pending"`

## 3. Get host property list

`GET /api/host/properties`

Expected:
- New property appears in the list

## 4. Get host property detail

`GET /api/host/properties/:id`

Expected:
- Full property details are returned
- `image` and `images` are populated

## 5. Logout host

`POST /api/auth/logout`

Expected:
- `200 OK`

## 6. Login as admin

`POST /api/auth/login`

```json
{
  "email": "admin@mail.com",
  "password": "123456"
}
```

Expected:
- `200 OK`

## 7. Get admin property list

`GET /api/admin/properties`

Expected:
- Pending property appears in the list

## 8. Get admin property detail

`GET /api/admin/properties/:id`

Expected:
- Full property details are returned

## 9. Approve property

`PUT /api/admin/properties/:id/status`

```json
{
  "status": "approved"
}
```

Expected:
- `200 OK`
- `message = "Property status updated successfully."`

## 10. Verify public listing

`GET /api/properties`

Expected:
- Approved property appears in the public list

## 11. Verify public detail

`GET /api/properties/:id`

Expected:
- Approved property detail is visible publicly

## 12. Update property as host

Login again as host first.

`PUT /api/host/properties/:id`

Body type: `form-data`

Update some fields:
- `title`
- `price`
- `description`
- optional new `coverImage`
- optional new `detailImages`
- optional `removedDetailImages`

Expected:
- `200 OK`
- `message = "Property updated successfully."`
- If the property was approved before editing, it moves back to `pending`

## 13. Approve updated property again

Login as admin again.

`PUT /api/admin/properties/:id/status`

```json
{
  "status": "approved"
}
```

Expected:
- `200 OK`

## 14. Update property directly as admin

`PUT /api/admin/properties/:id`

Body type: `form-data`

You can update:
- basic property fields
- `status`
- `coverImage`
- `detailImages`
- `removedDetailImages`

Expected:
- `200 OK`
- `message = "Property updated successfully."`

## 15. Delete property

As host:

`DELETE /api/host/properties/:id`

Or as admin:

`DELETE /api/admin/properties/:id`

Expected:
- `200 OK`
- `message = "Property deleted successfully."`

## Error cases to test

### Missing cover image on create

Create a property without `coverImage`.

Expected:
- `400 Bad Request`
- Validation error for `coverImage`

### Invalid host session

Call `POST /api/host/properties` without logging in as host.

Expected:
- `401` or `403` depending on session state

### Invalid status

`PUT /api/admin/properties/:id/status`

```json
{
  "status": "archived"
}
```

Expected:
- `400 Bad Request`
- `message = "Property status is invalid."`
