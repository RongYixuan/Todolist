window.addEventListener('load',function(){
    let tab=document.querySelectorAll('.tab > li');
    let content=document.querySelector('.content');
    let prev=0;
    let type='all';
    let todolist=[
        {
            id:1,content:'记得写作业',ctime:'2019/6/5',status:false
        },
        {
            id:2,content:'记得写作业',ctime:'2019/6/4',status:true
        },
        {
            id:3,content:'记得写作业',ctime:'2019/6/3',status:false
        },
        {
            id:4,content:'记得写作业',ctime:'2019/6/2',status:true
        }
    ];

    tab.forEach(function (ele,index) {
        ele.onclick=function () {
            tab[prev].classList.remove('hot');
            this.classList.add('hot');
            prev=index;
            type=this.getAttribute('type');
            render(filter(type));
        }
    });

    tab[0].onclick();
    function filter(type){
        let arr=[]
        switch (type) {
            case 'all':
                arr=todolist
                break
            case  'done':
                arr=todolist.filter(ele=>ele.status)
                break
            case  'doing':
                arr=todolist.filter(ele=>!ele.status)
                break
        }
        return arr
    }

    content.onclick =function (e) {
        let  target =e.target;
        let id=target.parentNode.id;
        if (target.nodeName=='DEL'){
            let  index = todolist.findIndex(ele => ele.id==id);
            todolist.splice(index,1);
            // render(filter(type))
        }else if (target.nodeName=='INPUT') {
            let ele=todolist.filter(ele=>ele.id==id)[0]
            ele.status=target.checked
        }
        render(filter(type))
    }

    //渲染
    function render(arr){
        let html='';
        arr.forEach(function (elem,index) {
            if(elem.status){
                html+= `
                     <li id="${elem.id}">
                        <input type="checkbox" checked="checked"><p>${elem.content}</p><del>✘</del><time>${elem.ctime}</time>
                     </li>
                    `;
            }else{
                html+= `
                     <li id="${elem.id}">
                        <input type="checkbox"><p>${elem.content}</p><del>✘</del><time>${elem.ctime}</time>
                     </li>
                    `;
            }
        });
        content.innerHTML=html;
    }

    let submitBtn=document.getElementsByName('submitBtn');
    let title=document.getElementsByName('title');
    console.log(submitBtn[0]);
    submitBtn[0].onclick=function (e){
        //消除submit提交的默认
        e.preventDefault();
        let obj=createObj();
        todolist.push(obj);   //对象推进对象数组里
        render(filter(type));
    }
    function createObj(){
        let content=title[0].value;
        let id=todolist[todolist.length-1].id+1;

        let ctime=new Date().toLocaleDateString();
        let status=false;
        return {id,content,ctime,status}
    }
})