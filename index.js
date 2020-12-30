var graph = -1; // 表示进行无向图操作(0) 还是 有向图操作(1)
var apexNum = -1; // 图的顶点数
var edgeNum = -1; // 图的边数

var graphArr = []; // 存放图的数组

// 创建表格 dom结构
function createTabel() {
    var apexTabel = document.getElementsByClassName('row')[0];
    var edgeTable = document.getElementsByClassName('row')[1];
    var apexStr = '<div>输入顶点vi</div>';
    var edgeStr = graph == 0 ? '<div>输入无向边(vi,vj)</div>' : '<div>输入有向边&lt;vi,vj&gt;</div>';
    for (var i = 0; i < apexNum; i++) {
        apexStr += '<div><input type="text"></div>';
    }
    for (var i = 0; i < edgeNum; i++) {
        edgeStr += '<div><input type="text"></div>';
    }
    apexTabel.innerHTML = apexStr;
    edgeTable.innerHTML = edgeStr;
    document.getElementsByClassName('create')[0].style.display = 'block';
}

// 创建图 函数
function createGraph() {
    var apexTabelInputArr = document.getElementsByClassName('row')[0].getElementsByTagName('input');
    var edgeTableInputArr = document.getElementsByClassName('row')[1].getElementsByTagName('input');
    for (var i = 0; i < apexNum; i++) {
        var data = apexTabelInputArr[i].value;
        graphArr.push(new Graph(data));
    }

    // 无向图建立
    if (graph == 0) {
        for (var i = 0; i < edgeNum; i++) {
            var str = edgeTableInputArr[i].value;
            var v1 = str.split(/[(]|[,]|[)]/)[1]; // 正则表达式匹配第一个顶点
            var v2 = str.split(/[(]|[,]|[)]/)[2]; // 正则表达式匹配第二个顶点
            var v1Index = -1,
                v2Index = -2;

            for (var k = 0; k < apexNum; k++) {
                if (v1 == graphArr[k].data) {
                    v1Index = k;
                }
                if (v2 == graphArr[k].data) {
                    v2Index = k;
                }
            }

            graphArr[v1Index].list.push(graphArr[v2Index].data);
            graphArr[v1Index].in++;

            graphArr[v2Index].list.push(graphArr[v1Index].data);
            graphArr[v2Index].in++;

        }
    } else if (graph == 1) {
        // 有向图建立
        for (var i = 0; i < edgeNum; i++) {
            var str = edgeTableInputArr[i].value;
            var v1 = str.split(/[<]|[,]|[>]/)[1]; // 正则表达式匹配第一个顶点
            var v2 = str.split(/[<]|[,]|[>]/)[2]; // 正则表达式匹配第二个顶点
            var v1Index = -1,
                v2Index = -2;

            for (var k = 0; k < apexNum; k++) {
                if (v1 == graphArr[k].data) {
                    v1Index = k;
                }
                if (v2 == graphArr[k].data) {
                    v2Index = k;
                }
            }
            graphArr[v1Index].list.push(graphArr[v2Index].data);
            graphArr[v1Index].out++;

            graphArr[v2Index].in++;
        }
    }
}

// 图的显示
function display() {
    document.getElementsByClassName('input-wrapper')[0].style.display = 'none';
    var outputDiv = document.getElementsByClassName('output')[0];
    outputDiv.style.display = 'block';
    outputDiv.innerHTML = '';
    var graphStr = graph == 0 ? '无向图' : '有向图';
    var str = '<div>' + graphStr + '的邻接表如下</div>';
    for (var i = 0; i < apexNum; i++) {
        var temp = graphArr[i].data;
        for (var j = 0; j < graphArr[i].list.length; j++) {
            temp = temp + '-->' + graphArr[i].list[j];
        }
        str = str + '<div>' + temp + '</div>';
    }

    if (graph == 0) {
        for (var i = 0; i < apexNum; i++) {
            str += '<div>顶点' + graphArr[i].data + '的度数为：' + graphArr[i].in + '</div>';
        }
    } else if (graph == 1) {
        for (var i = 0; i < apexNum; i++) {
            str += '<div>顶点' + graphArr[i].data + '的入度为：' + graphArr[i].in + '</div>';
            str += '<div>顶点' + graphArr[i].data + '的出度为：' + graphArr[i].out + '</div>';
        }
    }
    outputDiv.innerHTML = str;
    document.getElementsByClassName('check')[0].style.display = 'block';
}

// 初始函数
function init() {
    var chooseBtn = document.getElementsByClassName('choose')[0].getElementsByTagName('button')[0];
    // 点击填写信息按钮
    chooseBtn.onclick = function() {
        var graphChooseArr = document.getElementsByName('graph');
        for (var i = 0; i < graphChooseArr.length; i++) {
            if (graphChooseArr[i].checked) {
                graph = i; // 确定选择的操作是什么
            }
        }

        var apex_num = document.getElementById('apex-num').value;
        var edge_num = document.getElementById('edge-num').value;

        if (apex_num === "" || edge_num === "" || isNaN(apex_num) || isNaN(edge_num)) {
            alert('请填写正确的信息');
            return;
        }
        var n = apex_num;
        var temp = graph == 0 ? n * (n - 1) / 2 : n * (n - 1);
        if (edge_num <= 0 || edge_num > temp) {
            alert('请输入正确的边数');
            return;
        }

        apexNum = parseInt(apex_num);

        edgeNum = parseInt(edge_num);
        createTabel();
    }

    // 点击生成图按钮
    var createBtn = document.getElementsByClassName('create')[0].getElementsByTagName('button')[0];
    createBtn.onclick = function() {
        createGraph();
        display();
    }

    // 检查边是否存在
    var checkBtn = document.getElementsByClassName('check')[0].getElementsByTagName('button')[0];
    checkBtn.onclick = function() {
        var checkInput = document.getElementById('check-input');
        var str = checkInput.value;
        var v1 = '',
            v2 = '';
        if (graph == 0) {
            v1 = str.split(/[()]|[,]|[)]/)[1];
            v2 = str.split(/[()]|[,]|[)]/)[2];
        }
        if (graph == 1) {
            v1 = str.split(/[<]|[,]|[>]/)[1];
            v2 = str.split(/[<]|[,]|[>]/)[2];
        }

        var v1Index = -1,
            v2Index = -1;

        for (var k = 0; k < apexNum; k++) {
            if (v1 == graphArr[k].data) {
                v1Index = k;
            }
            if (v2 == graphArr[k].data) {
                v2Index = k;
            }
        }


        if (graphArr[v1Index].list.indexOf(graphArr[v2Index].data) != -1) {
            alert('该边存在');
        } else {
            alert('该边不存在');
        }

        checkInput.value = '';
    }

}

init();