def is_four_shunzi(arr):
    list = sorted(arr)
    new_list = []
    for i in list:
        if i not in new_list:
            new_list.append(i)
    #print(new_list)
    if len(new_list)<4:
        return 0
    count = 1
    #print(new_list)
    for i in range(1, len(new_list)):
        if(new_list[i]-new_list[i-1]==1):
            count = count + 1
            #print(count)
            if count == 4:
                return 1
        else:
            count = 1
    return 0

def is_five_shunzi(arr):
    list = sorted(arr)
    if(list[0]>2):
        return 0
    for i in range(1, 5):
        if(list[i]-list[i-1]!=1):
            return 0
    return 1

def is_double_double(arr):
    list = sorted(arr)
    if len(list)<4:
        return 0
    count_1 = 1
    count_2 = 0
    for i in range(1,len(list)):
        if list[i] == list[i-1]:
            count_1 = count_1 + 1
        else:
            count_1 = 1
        if count_1 == 2:
            count_2 = count_2 + 1

    if count_2 >= 2:
        return 1
    return 0

def is_trible(arr):
    list = sorted(arr)
    if len(list)<3:
        return 0
    count = 1
    for i in range(1,len(list)):
        if list[i] == list[i-1]:
            count = count + 1
        else:
            count = 1
        if count >= 3:
            return 1
    return 0

def is_quadruple(arr):
    list = sorted(arr)
    if len(list) < 4:
        return 0
    count = 1
    for i in range(1, len(list)):
        if list[i] == list[i - 1]:
            count = count + 1
        else:
            count = 1
        if count >= 4:
            return 1
    return 0

def is_fivefold(arr):
    list = sorted(arr)
    if len(list) < 5:
        return 0
    count = 1
    for i in range(1, len(list)):
        if list[i] == list[i - 1]:
            count = count + 1
        else:
            count = 1
        if count >= 5:
            return 1
    return 0

def is_hulu(arr):
    if is_double_double(arr) and is_trible(arr):
        return 1
    return 0

#判断优先级  大顺子  小顺子  葫芦  五连  四连   双对和三连
def get_score(arr):
    score = 0
    #print("输入数组：")
    #print(arr)
    for i in range(0,len(arr)):
        score = score + arr[i]

    if is_five_shunzi(arr):
        score = score + 60
    else:
        if is_four_shunzi(arr):
            score = score + 30
        else:
            if is_hulu(arr):
                score = score + 20
            else:
                if is_fivefold(arr):
                    score = score + 100
                else:
                    if is_quadruple(arr):
                        score = score + 40
                    else:
                        if is_trible(arr) or is_double_double(arr):
                            score = score + 10
    #print("得分")
    #print(score)
    return score