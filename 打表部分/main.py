import check
import get_list
import robot

f1 = open("list.txt","w",encoding="utf-8")
f2 = open("ave.txt","w",encoding="utf-8")

def get_counts(arr,n):
    new_arr = []
    new_arr = arr.copy()
    if len(new_arr)<5:
        new_arr.append(0)
    new_arr_copy = []
    for i in range(1,7):
        new_arr[n] = i;
        if n<4:
            get_counts(new_arr,n+1)
        if new_arr[len(new_arr)-1]!=0:
            #print(new_arr)
            list = []
            robot.get_counts(new_arr, len(new_arr), list)
            ave=robot.get_ave(list)
            #print(ave.txt)
            list.append(new_arr.copy())
            for i in range(0,len(new_arr)):
                f1.write(str(new_arr[i]))
            f1.write("\n")
            f1.write(str(ave))
            f1.write("\n")

b=[]
get_counts(b,0)


'''
a = [1,3,4,5,6]
print(check.get_score(a))
'''


'''
a = [4,5]
list = []
robot.get_counts(a,len(a),list)
#print(list)
print(robot.get_ave(list))
a = [4,5,6,6]
list = []
robot.get_counts(a,len(a),list)
#print(list)
print(robot.get_ave(list))

'''
