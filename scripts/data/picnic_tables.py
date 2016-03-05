#!/usr/bin/python2

#
# This script will download the latest data from the City of Edmonton 'picnic tables' dataset and replace our
# 'picnic tales' dataset with that one.
#

import json
import pymongo
import urllib

desired_columns = ["id", "Table Type", "Surface Material", "Structural Material", "Latitude", "Longitude"]

# Get picnic_tables database and throw it in to a JSON object
print("Downloading & parsing 'picnic tables' dataset...")
picnic_tables_url = urllib.urlopen("https://data.edmonton.ca/api/views/vk3s-q842/rows.json?accessType=DOWNLOAD")
#picnic_tables_file = open('picnic_tables.json', 'r')
obj = json.load(picnic_tables_url)
#obj = json.load(picnic_tables_file)

# Get indexes
columns = {}
column_number = 0
for column in obj["meta"]["view"]["columns"]:
  # DEBUG
  column_name = column["name"]
  if column_name in desired_columns:
    columns[column_name] = column_number
  column_number += 1

# Set Up Mongo Connection
mongo = pymongo.MongoClient()
db = mongo["picknic-dev"]
picnic_tables = db.picnic_tables

# Clear all existing picnic_tables
print("Removing existing 'picnic tables' data...")
picnic_tables.delete_many({})

# Add all the picnic_tables
print("Adding 'picnic tables' data...")
num_picnic_tables = 0
for picnic_table in obj["data"]:
  id = picnic_table[columns["id"]]
  table_type = picnic_table[columns["Table Type"]]
  surface_material = picnic_table[columns["Surface Material"]]
  structural_material = picnic_table[columns["Structural Material"]]
  latitude = picnic_table[columns["Latitude"]]
  longitude = picnic_table[columns["Longitude"]]

  try:
    picnic_table = {
      "coe_uuid" : id,
      "table_type" : table_type,
      "surface_material": surface_material,
      "structural_material": structural_material,
      "location" : [ float(longitude), float(latitude) ]
    }
    picnic_tables.insert(picnic_table)
    num_picnic_tables += 1
  except Exception as e:
    print("Could not add picnic table: ", id, table_type, surface_material, structural_material, latitude, longitude)
    print("Reason:",e)

print str(num_picnic_tables) + " picnic tables added!"
