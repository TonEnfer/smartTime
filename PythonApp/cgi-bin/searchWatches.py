#!/usr/bin/env python3

import json
import requests
import sqlite3
import hashlib
ip = 'http://192.168.88.{addr}:8080'

db = sqlite3.connect("../../DB/db.sqlite")
cursor = db.cursor()
result = "Not found"

for i in range(1,255):
	address = ip.format(addr=i)
	#print(address)
	try:
		response = requests.get(address+"/cgi-bin/getName.py", timeout=0.3)
	except:
		#print("Timeout")
		#traceback.print_exc()
		pass
	else:
		#print(response.status_code)
		if(response.status_code == 200):
			result = 'Updated'
			name = response.json()['name']
			ret = cursor.execute("select * from Watchs where ip = '{}'".format(address)).fetchall()
			if(len(ret) != 0):
				#print("Известные часы")
				ret = ret[0]
				id_t,ip_t,name_t = [str(i) for i in ret]
				if(name_t != name):
					#print("Modyfy name")
					ip_addr=(address).encode('utf-8')
					name_w = (name).encode('utf-8')
					id = hashlib.sha224(ip_addr+name_w).hexdigest()
					#print("For address {addr} watch found".format(addr=address))
					#print(id)
					query = "update Watchs set values ('{id_w}','{ip_w}','{name_w}' where ip = '{ip_w}')".format(id_w = id,ip_w = address,name_w = name)
					#print(query)
					cursor.execute(query)
					result = "Modyfy exists"
			else:
				#print("Новые часы")
				ip_addr=(address).encode('utf-8')
				name_w = (name).encode('utf-8')
				id = hashlib.sha224(ip_addr+name_w).hexdigest()
				#print("For address {addr} watch found".format(addr=address))
				#print(id)
				query = "insert into Watchs values ('{id_w}','{ip_w}','{name_w}')".format(id_w = id,ip_w = address,name_w = name)
				#print(query)
				cursor.execute(query)
				result = "Add new"
		#else:
			#pass
			#print("For address {addr} watch not found".format(addr=address))
			

db.commit()
db.close()
print("Content-type: text/html\n")
print(json.dumps({'result':result}))