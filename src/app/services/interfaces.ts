export interface Note{
    content:string,
    title:string
}
export interface node{
    note:{
        content:string,
        title:string
    },
    node_id:string
}
export interface NotesResponse{
    success:boolean,
    message:Array<node>
}
export interface response{
    success:boolean,
    message:string
}