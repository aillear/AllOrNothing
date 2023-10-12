import p_list


def is_arr1_in_arr2(arr1,arr2):
    count1_1 = 0
    count2_1 = 0
    count3_1 = 0
    count4_1 = 0
    count5_1 = 0
    count6_1 = 0

    count1_2 = 0
    count2_2 = 0
    count3_2 = 0
    count4_2 = 0
    count5_2 = 0
    count6_2 = 0

    for j in range(len(arr1)):
        if arr1[j] == 1:
            count1_1 = count1_1 + 1
        if arr1[j] == 2:
            count2_1 = count2_1 + 1
        if arr1[j] == 3:
            count3_1 = count3_1 + 1
        if arr1[j] == 4:
            count4_1 = count4_1 + 1
        if arr1[j] == 5:
            count5_1 = count5_1 + 1
        if arr1[j] == 6:
            count6_1 = count6_1 + 1
    for k in range(len(arr2)):
        if arr2[k] == 1:
            count1_2 = count1_2 + 1
        if arr2[k] == 2:
            count2_2 = count2_2 + 1
        if arr2[k] == 3:
            count3_2 = count3_2 + 1
        if arr2[k] == 4:
            count4_2 = count4_2 + 1
        if arr2[k] == 5:
            count5_2 = count5_2 + 1
        if arr2[k] == 6:
            count6_2 = count6_2 + 1
    if count1_1 <= count1_2 and count2_1 <= count2_2 and count3_1 <= count3_2 and count4_1 <= count4_2 and count5_1 <= count5_2 and count6_1 <= count6_2:
        return 1
    else:
        return 0

priority_list = p_list.get_list()

def get_max(arr,result):
    for i in range(len(priority_list)):
        if is_arr1_in_arr2(arr,priority_list[i]):
            if is_arr1_in_arr2(priority_list[i],result):
                return priority_list[i]
    return arr


print(get_max([],[1,1,4,5,1]))