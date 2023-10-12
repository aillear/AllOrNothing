import matplotlib.pyplot as plt

def get_max():
    f1 = open("list.txt","r",encoding="utf-8")
    f2 = open("ave.txt","r",encoding="utf-8")
    lists = list(f1)
    print(len(lists))
    #print(counts)

    new_list = [count.replace("\n","") for count in lists]

    print(len(new_list))

    ave = []
    counts = []


    for i in range(0,len(new_list)):
        if i % 2 == 0:
            counts.append(new_list[i])
        else:
            ave.append(new_list[i])
    #print(len(counts))
    #print(len(ave.txt))

    for i in range(0,len(ave)):
        ave[i]=float(ave[i])
    #print(ave.txt)



    for i in range(len(ave)):
        preIndex = i-1
        current = ave[i]
        current_1 = counts[i]
        while preIndex >= 0 and ave[preIndex] < current:
            ave[preIndex+1] = ave[preIndex]
            counts[preIndex + 1] = counts[preIndex]
            preIndex-=1
            ave[preIndex+1] = current
            counts[preIndex + 1] = current_1

    dice_count = []





    for i in range(len(counts)):
        dice_count.append(list(counts[i]))


    #print(ave.txt)
    #print(dice_count)
    #print(len(ave.txt))





    f_x = open("all.txt","w",encoding="utf-8")

    for i in range(0,len(counts)):
        f_x.write(counts[i])
        f_x.write("\n")

get_max()

'''
f_1 = open("1.txt","w",encoding="utf-8")
f_2 = open("2.txt","w",encoding="utf-8")
f_3 = open("3.txt","w",encoding="utf-8")
f_4 = open("4.txt","w",encoding="utf-8")
f_5 = open("5.txt","w",encoding="utf-8")

for i in range(len(counts)):
    if len(counts[i]) == 1:
        f_1.write(counts[i])
        f_1.write("\n")
    if len(counts[i]) == 2:
        f_2.write(counts[i])
        f_2.write("\n")
    if len(counts[i]) == 3:
        f_3.write(counts[i])
        f_3.write("\n")
    if len(counts[i]) == 4:
        f_4.write(counts[i])
        f_4.write("\n")
    if len(counts[i]) == 5:
        f_5.write(counts[i])
        f_5.write("\n")
'''