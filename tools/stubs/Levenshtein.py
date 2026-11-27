def _dp(a,b):
    n,m=len(a),len(b);D=[[0]*(m+1) for _ in range(n+1)]
    for i in range(n+1):D[i][0]=i
    for j in range(m+1):D[0][j]=j
    for i in range(1,n+1):
        ai=a[i-1];Di=D[i];Dp=D[i-1]
        for j in range(1,m+1):
            Di[j]=min(Dp[j]+1,Di[j-1]+1,Dp[j-1]+(ai!=b[j-1]))
    return D
def distance(a,b):return _dp(a,b)[len(a)][len(b)]
def editops(a,b):
    D=_dp(a,b);i,j=len(a),len(b);ops=[]
    while i>0 or j>0:
        if i>0 and j>0 and a[i-1]==b[j-1] and D[i][j]==D[i-1][j-1]: i-=1;j-=1;continue
        if i>0 and j>0 and D[i][j]==D[i-1][j-1]+1: ops.append(('replace',i-1,j-1));i-=1;j-=1
        elif i>0 and D[i][j]==D[i-1][j]+1: ops.append(('delete',i-1,j));i-=1
        else: ops.append(('insert',i,j-1));j-=1
    return ops[::-1]

def opcodes(a,b):
    D=_dp(a,b);i,j=len(a),len(b);ops=[]
    while i>0 or j>0:
        if i>0 and j>0 and a[i-1]==b[j-1] and D[i][j]==D[i-1][j-1]: ops.append(('equal',i-1,j-1));i-=1;j-=1
        elif i>0 and j>0 and D[i][j]==D[i-1][j-1]+1: ops.append(('replace',i-1,j-1));i-=1;j-=1
        elif i>0 and D[i][j]==D[i-1][j]+1: ops.append(('delete',i-1,j));i-=1
        else: ops.append(('insert',i,j-1));j-=1
    ops=ops[::-1];out=[]
    for t,x,y in ops:
        dx=0 if t=='insert' else 1; dy=0 if t=='delete' else 1
        if out and out[-1][0]==t and out[-1][2]==x and out[-1][4]==y:
            o=out[-1];out[-1]=(t,o[1],x+dx,o[3],y+dy)
        else: out.append((t,x,x+dx,y,y+dy))
    return out
