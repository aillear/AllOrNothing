f_1 = open("all.txt","r",encoding="utf-8")



list_1 = list(f_1)
print(list_1)

new_list_1 = [counts.replace("\n",'') for counts in list_1]


for i in range(len(new_list_1)):
    new_list_1[i] = list(new_list_1[i])

list_2 = []
for counts in new_list_1:
    counts = sorted(counts)
    for i in range(len(counts)):
        counts[i] = int(counts[i])

    if counts not in list_2 and len(counts) == 5:
        list_2.append(counts)
print(list_2)
print(len(list_2))