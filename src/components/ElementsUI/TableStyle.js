import {Table} from "reactstrap";

export default function TableStyle({columnNames,data}){

    return (
        <Table striped>
            <thead>
               <tr style={{fontSize:"1.2rem"}}>
                { columnNames.map((name,index) =>  
                   <th key={index} style={{backgroundColor:"#009e8b",color:"#fff", 
                               ...(index == 0 && {borderTopLeftRadius: "15px"}),
                               ...(index == columnNames.length - 1  && {borderTopRightRadius: "15px"})}}>{name}</th>)}
               </tr>
            </thead>
            <tbody>
                { data.map((e,index)  => 
                  <tr key={e.id || index}>
                    {columnNames.map((columnName, index2) => {
                       return (
                         <td key={index2} style={{backgroundColor:"#ddffff", borderBottomWidth:0,
                                      ...((index == data.length - 1 && index2 == 0) && { borderBottomLeftRadius: "15px"}),
                                      ...((index == data.length - 1 && index2 == columnNames.length -1 ) && { borderBottomRightRadius: "15px"}),
                                    }}>
                              {e[columnName]}
                         </td>
                       );
                    })}
                  </tr>
                )}
            </tbody>
       </Table>
    );
}