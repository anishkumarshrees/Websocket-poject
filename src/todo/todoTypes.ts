enum Status {
    Completed = 'completed',
    Pending = 'Pending'
}


export interface ITodo{
    task: string,
    deadLine: string,
    status: Status
}
export {Status}