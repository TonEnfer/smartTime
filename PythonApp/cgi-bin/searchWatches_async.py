#!/usr/bin/env python3

import json
import grequests
import requests
import sqlite3
import hashlib
from time import sleep

db = sqlite3.connect("../DB/db.sqlite")
cursor = db.cursor()

result  = "Not found"

ip = 'http://192.168.88.{addr}:8080'

def do_something(r, **kwargs):
	global result
	if(r.status_code == 200):
		result = 'Updated'
		address = "http://" + r.url.split("/")[2]
		print(address)
		name = r.json()['name']
		print(name)
		ret = cursor.execute("select * from Watchs where ip = '{}'".format(address)).fetchall()
		if(len(ret) != 0):
			ret = ret[0]
			id_t,ip_t,name_t = [str(i) for i in ret]
			if(name_t != name):
				print("Modyfy name")
				ip_addr=(address).encode('utf-8')
				name_w = (name).encode('utf-8')
				id = hashlib.sha224(ip_addr+name_w).hexdigest()
				print("For address {addr} watch found".format(addr=address))
				print(id)
				query = "update Watchs set values ('{id_w}','{ip_w}','{name_w}' where ip = '{ip_w}')".format(id_w = id,ip_w = address,name_w = name)
				print(query)
				cursor.execute(query)
				result = "Modyfy exists"
		else:
			print("Новые часы")
			ip_addr=(address).encode('utf-8')
			name_w = (name).encode('utf-8')
			id = hashlib.sha224(ip_addr+name_w).hexdigest()
			print("For address {addr} watch found".format(addr=address))
			print(id)
			query = "insert into Watchs values ('{id_w}','{ip_w}','{name_w}')".format(id_w = id,ip_w = address,name_w = name)
			print(query)
			cursor.execute(query)
			result = "Add new"
	
		

async_list = []

for i in range(1,255):
	adr = ip.format(addr=i)+"/cgi-bin/getName.py"
	action_item = grequests.get(adr, hooks = {'response' : [do_something]},timeout=1)
	async_list.append(action_item)

n=''
n = grequests.map(async_list)
#while (n == ''):
#	pass
#sleep(1.5)
db.commit()
db.close()
print("Content-type: text/html\n")
print(json.dumps({'result':result}))