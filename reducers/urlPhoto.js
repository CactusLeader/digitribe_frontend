export default function (photoList = [], action) {
    console.log("#2photoList",photoList)
    console.log("#2action",action)
    if(action.type == 'addPhoto'){
        return [...photoList, (action.photo)];
    } else {
        return photoList;
    }
}