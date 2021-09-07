#-*-coding:utf-8-*-

import sys
import io 

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

def getName(name, age): 
    print (name + " : " + age) 
if __name__ == '__main__': 
    getName(sys.argv[1], sys.argv[2])

