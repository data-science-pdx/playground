#!/home/mingjue/pyenv/venv37/bin/python3
from pymongo import MongoClient
from datetime import datetime
import csv
import json

#client = MongoClient('mongodb://cdk:cdk123@localhost:27017/dms')
client = MongoClient('mongodb://localhost:27017/')
db = client.freeway
def detectorsConnection():
    posts= db.detectors
    csvfile = open('/home/mingjue/linuxdocs/freeway/freeway_detectors.csv', 'r')
    reader = csv.DictReader( csvfile)
    header = ["detectorid","highwayid","milepost","locationtext","detectorclass","lanenumber","stationid","upstream","downstream","stationclass","numberlanes","latlon","length","shortdirection","direction","highwayname"]
    for each in reader:
        row={}
        for field in header:
            row[field]=each[field]
            id_detector = int(row.get('detectorid'))
            row['detectorid'] = id_detector
            if row.get('highwayid') == None:
                id_highway = row.get('highwayid')
            else:
                id_highway = int(row.get('highwayid'))

            if row.get('milepost') == None:
                id_milepost = row.get('milepost')
            else:
                id_milepost = float(row.get('milepost'))

            if row.get('stationid') == None:
                id_station = row.get('stationid')
            else:
                id_station = int(row.get('stationid'))

            if row.get('detectorclass') == None:
                id_detectorclass = row.get('detectorclass')
            else:
                id_detectorclass = int(row.get('detectorclass'))
            
            if row.get('lanenumber') == None:
                id_lanenumber = row.get('lanenumber')
            else:
                id_lanenumber = int(row.get('lanenumber'))
          
            if row.get('upstream') == None:
                id_upstream = row.get('upstream')
            else:
                id_upstream = int(row.get('upstream'))

            if row.get('downstream') == None:
                id_downstream = row.get('downstream')
            else:
                id_downstream = int(row.get('downstream'))

            if row.get('stationclass') == None:
                id_stationclass = row.get('stationclass')
            else:
                id_stationclass = int(row.get('stationclass'))

            if row.get('stationclass') == None:
                id_stationclass = row.get('stationclass')
            else:
                id_stationclass = int(row.get('stationclass'))

            if row.get('numberlanes') == None:
                id_numberlanes = row.get('numberlanes')
            else:
                id_numberlanes = int(row.get('numberlanes'))

            if row.get('length') == None:
                id_length = row.get('length')
            else:
                id_length = float(row.get('length'))

            row['highwayid'] = id_highway
            row['milepost'] = id_milepost
            row['stationid'] = id_station
            row['detectorclass'] = id_detectorclass
            row['lanenumber'] = id_lanenumber
            row['upstream'] = id_upstream
            row['downstream'] = id_downstream
            row['stationclass'] = id_stationclass
            row['numberlanes'] = id_numberlanes
            row['length'] = id_length


        posts.insert_one(row)
    print(f"I am done insert detectors data ")

def loopdataConnection(dictionary):
    print("Starting loopdataConnection")
    posts= db.loopdata
    posts.create_index("detectorid")
    posts.create_index("starttime")
    csvfile = open('/home/mingjue/linuxdocs/freeway/freeway_loopdata.csv', 'r')
    reader = csv.DictReader( csvfile)
    header = ["detectorid","starttime","volume","speed","occupancy","status"]
    for each in reader:
        print(f"each is {each}")
        row=each
        for field in header:
            try:
                print(f"Working on field {field}")
                if field in ['detectorid', 'volume', 'speed', 'occupancy', 'status']:
                    if each[field] == '':
                        value = None
                    else:
                        value = int(each[field])
                else:
                    # should be starttime
                    if each[field] == '':
                        value = None
                    else:
                        input_value = each['starttime']
                        input_value = input_value[:16]
                        value = datetime.strptime(input_value,'%Y-%m-%d %H:%M')
                        print(f"input_value: {input_value}, value: {value}")
            
                row[field] = value
            except Exception as e:
                print(f"Error: {e} in data: {each}")
        try:
            posts.insert_one(row)
        except Exception as e:
            print(f"Error on insert_one: {e}")
    print(f"I am done insert loopdata")


def prejoin(dictionary):
    print("Starting xiaojibib")
    posts= db.xiaojibibi
    posts.create_index("detectorid")
    posts.create_index("starttime")
    csvfile = open('/home/mingjue/linuxdocs/freeway/freeway_loopdata.csv', 'r')
    reader = csv.DictReader( csvfile)
    header = ["detectorid","starttime","volume","speed","occupancy","status"]
    for each in reader:
        #print(f"each is {each}")
        row=each
        for field in header:
            try:
                #print(f"Working on field {field}")
                if field in ['detectorid', 'volume', 'speed', 'occupancy', 'status']:
                    if each[field] == '':
                        value = None
                    else:
                        value = int(each[field].strip())
                else:
                    # should be starttime
                    if each[field] == '':
                        value = None
                    else:
                        input_value = each['starttime']
                        input_value = input_value[:16]
                        value = datetime.strptime(input_value,'%Y-%m-%d %H:%M')
                        #print(f"input_value: {input_value}, value: {value}")
                row[field] = value
            except Exception as e:
                print(f"Error: {e} in data: {each}")
        rowkey = row["detectorid"]
        if row['detectorid'] == 1350:
            print(f"row for 1350: {row}")
        if rowkey is not None:
            if rowkey in dictionary:
                row["detectorInfor"] = [dictionary[rowkey]]
                #print(f"the data :{row}")
            else:
                print(f"Missing data for {rowkey} : in {row}")
        try:
            posts.insert_one(row)
        except Exception as e:
            print(f"Error on insert_one: {e}")
    print(f"I done with prejoin function")

def buildNestedObject():
    csvfile = open('/home/mingjue/linuxdocs/freeway/freeway_detectors.csv', 'r')
    reader = csv.DictReader( csvfile)
    header = ["detectorid","highwayid","milepost","locationtext","detectorclass","lanenumber","stationid","upstream","downstream","stationclass","numberlanes","latlon","length","shortdirection","direction","highwayname"]
    rows={}
    for data in reader:
        # print(f"data is {data}")
        
        if data['detectorid'].strip() == "1350":
            print(f"data for 1350: {data}")
        row_key= int(data["detectorid"].strip())
        row={}
        for field in header:
            try:
                # print(f"Working on field {field}")
                if field in ["detectorid","highwayid","detectorclass","lanenumber","stationid","highwayid","upstream","downstream","stationclass","numberlanes"]:
                    if data[field] == "":
                        value = None
                    else:
                        value = int(data[field])
                elif field in ["milepost","length"]:
                    if data[field] == "":
                        value = None
                    else:
                        value = float(data[field])
                else:
                    if data[field] == "":
                        value = None
                    else:
                        value = data[field]
                row[field] = value
                
                #print(f"Object: {row} ^^^^^^^^^^^^")        
            except Exception as e:
                print(f"Error: {e} in data: {data}")
        rows[row_key] = row
    return rows


def testBuildNestedObject():
    with open('/home/mingjue/linuxdocs/freeway_backup/freeway_detectors.csv', 'r') as csvfile:
        reader = csv.DictReader( csvfile)
        header = ["detectorid","stationid"]
        rows={}
        for data in reader:
            # print(f"data is {data}")
            row_key= int(data["stationid"].strip())
            key_detectorid = int(data["detectorid"])
            if row_key in rows:
                rows[row_key].append(key_detectorid)
            else:
                rows[row_key] = [key_detectorid]               
    return rows

def testPrejoin(dictionary):
    print("Starting something")
    posts= db.stations
    posts.create_index([("locationtext",1),("stationid",1)])
    with open('/home/mingjue/linuxdocs/freeway_backup/freeway_stations.csv', 'r') as csvfile:
        reader = csv.DictReader( csvfile)
        header = ["locationtext","stationid","milepost","upstream","downstream","numberlanes","latlon","length"]
        value = None
        print(f"the dictionary station id :{dictionary}")
        print(f"------------------------------")
    
        for each in reader:
            row=each
            for field in header:
                try:
                    #print(f"Working on field {field}")
                    if field in ["stationid","upstream","downstream","numberlanes"]:
                        if each[field] == '':
                            value = None
                        else:
                            value = int(each[field].strip())
                    elif field in ["milepost","length"]:
                        if each[field] == "":
                            value = None
                        else:
                            value = float(each[field].strip())
                    else:
                        value = each[field]
                    row[field] = value
                except Exception as e:
                    print(f"Error: {e} in data: {each}")
            rowkey = row["stationid"]
            
            if rowkey is not None:
                if rowkey in dictionary:
                    print(f"the rowkey in id file :{rowkey}")
                    print(f"------------------------------")
                    row["stationid"] = dictionary[rowkey]
                    #print(f"the data :{row}")
                else:
                    print(f"Missing data for {rowkey} : in {row}")
                    print("")
            try:
                posts.insert_one(row)
            except Exception as e:
                print(f"Error on insert_one: {e}")
    print(f"I done with prejoin function")

try:
    # detectorsConnection()
    # loopdataConnection()
    #bbObject = buildNestedObject()
    #prejoin(bbObject)
    #print(f" object :{bbObject}")
    test = testBuildNestedObject()
    testPrejoin(test)
except Exception as exception:
    print(f"we got the error {exception}")
