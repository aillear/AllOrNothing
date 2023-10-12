import check
def get_counts(arr,n,list):
    new_arr = []
    new_arr = arr.copy()
    if len(new_arr)==5:
        list.append(new_arr.copy())
        return
    if len(new_arr)<5:
        new_arr.append(0)
    new_arr_copy = []
    for i in range(1,7):
        new_arr[n] = i;
        if n<4:
            get_counts(new_arr,n+1,list)
        else:
            #print(new_arr)
            list.append(new_arr.copy())


def get_ave(list):
    sum = 0
    for i in range(0,len(list)):
        print(list[i])
        score = check.get_score(list[i])
        print(score)
        sum = sum + score
    return sum/len(list)