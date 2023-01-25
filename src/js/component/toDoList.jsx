import React, { useState, useEffect  } from "react";


const ToDoList = () => {

	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);

	function createUser() {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/daniel', {
		  method: "POST",
		  body: JSON.stringify([]),
		  headers: {
			"Content-Type": "application/json"
		  }
		})
	
		.then((response)=>response.json())
		.then((data)=> {if (data.result === "ok") {getUser()} 
  console.log(data)})//esta linea guarda la info transformada en un objeto en data
		.catch((err)=>console.log(err))
	}
	function getUser() {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/daniel', {
		  method: "GET",
		  
		  headers: {
			"Content-Type": "application/json"
		  }
		})
	
		.then((response) => {console.log(response.status);
			if (response.status === 404) {createUser()}
			return response.json()})//esta linea convierte la respuesta en un json
				.then((data)=>setTaskList(data))//esta linea guarda la info transformada en un objeto
				.catch((err)=>console.log(err))//el catch te comunica si algo salió mal
		  }
	function updateToDoList () {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/daniel' , {
		  method: 'PUT',
		  headers: {
			'Content-type': 'application/json'
		  },
			body: JSON.stringify(taskList)
		  })
			.then ((response) => response.json ())
			.then(taskList => console.log( JSON.stringify(taskList)))
			.catch((err)=>console.log(err))
		  }
	function deletetodo () {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/daniel' , {
		  method: 'Delete',
		  headers: {
			'Content-type': 'application/json'
		  },

	})
	        .then ((response) => response.json ())
			.then ((data) => console.log (data))
			.catch((err)=>console.log(err))
		  }

	const AddTask = (e) => {
		if (e.task !== "") {
			const taskDetails = {
				
				label: task,
				done: false,
			};

			setTaskList([...taskList, taskDetails]);
			setTask("")
		};
	};
	const deleteTask = (indexToDelete) => {
		
		setTaskList(taskList.filter((task,index) => index != indexToDelete));
		
	}
	const handleChange = (event) => {
		setTask(event.target.value);
	};
	useEffect(()=>{ //forma 1
		
		getUser()
		//bloque de codigo que queremos
		console.log("Me estoy ejecutando porque ya cargó el componente");
	},[])// cuando el array esta vacio 
	
	useEffect(()=>{ //forma 2
		if (taskList.length > 0 ) {
			updateToDoList(taskList);
		  }
		}, [taskList]);
		

	return (
	    <div className="title glow container col-xs-6 col-sm-9 col-md-12 ">
			<h1>La vida del Esclavo</h1>
		

		<div className="list glow">
			
			<div>
			<input
				className="input-field"
				type="text"
				name="text"
				id="text"
				placeholder="Add task here..."
				onChange ={handleChange}
				value={task}
			/>

			<button onClick={AddTask} className="btn">Añadir tareas</button>
			
			</div>
			
				<ul className="glow">
				{taskList.length > 0  ?
					taskList.map((t,index) => (
						<li key={index} >
							{t.label}
							<button className="delete" onClick={() => deleteTask(index)}>
								X
							</button>
						</li>
					)
					) : null}
				</ul>
			
			<div>
				<button className="delete" onClick={() => deletetodo()}>
								Borrar Todo
				</button>
			</div>
		</div>

	
	</div>
	);
};
	
	


export default ToDoList;
