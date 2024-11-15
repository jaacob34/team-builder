// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id //function to add a unique id to every team member

const initialValue = () => ({ //set values to original state whenever you submit
  fname: '',
  lname: '',
  bio: ''
})

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  { //data
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \ 
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

export default function App() {
  const [members, setMembers] = useState(teamMembers) //holds all the members data
  const [editing, setEditing] = useState(null) //a state to pull data from existing member to edit
  const [inputValue, setInputValue] = useState(initialValue()) //holds values of the input boxes
  // ✨ Create a third state to track the values of the inputs

  useEffect(() => {

    // ✨ If the `editing` state changes from null to the number 2 (for example)
    // this means we need to populate the inputs of the form
    // with the data belonging to the member with id 2.
    // On the other hand, if the `editing` state changes back to null
    // then we need to reset the form back to empty values
    if (editing == null) { 
      setInputValue(initialValue()) //if the editing value is null it resets the input value
    } else {
      const { fname, lname, bio } = members.find(member => member.id === editing) //finds the member with id of the
      setInputValue({ fname, lname, bio }) //editing state decontructs the property and sets input values
    }
  }, [editing])

  const onChange = evt => { //for onchange handler
    const { id, value } = evt.target //deconstructs the targer id/name and value
    setInputValue(prevInputValue => ({ ...prevInputValue, [id]: value })) //takes what is inside the input value
    //and updates it with what is being typed
    // ✨ This is the change handler for your text inputs and your textarea.
    // You can check `evt.target.id` to know which input changed
    // and then you can use `evt.target.value` to update the state of the form
  }
  const edit = id => {  //used as click handler and passes the id pulled to use setEditing function
    //to change the state of edit so useEffect gets triggered and populated the input values
    setEditing(id)
    // ✨ Put this function inside a click handler for the <button>Edit</button>.
    // It should change the value of `editing` state to be the id of the member
    // whose Edit button was clicked

  }
  const submitNewMember = () => { //function to be called when using submit button
    const newMember = { id: getId(), ...inputValue, }  //adds id and input values to member if called
    setMembers([...members, newMember]) //uses spread operater to make shallow copy and add new member to the list
    
    // This takes the values of the form and constructs a new member object,
    // which is then concatenated at the end of the `members` state
  }
  const editExistingMember = () => { //function for submit button to update instead of making a new member
    setMembers(prevMembers => prevMembers.map(mem => { //maps over current members
      if (mem.id == editing) { //checks if members id matches the edit state id if it does
        return { ...mem, ...inputValue } //the members properties are spread along with input values and if the
        //input keys match any of the members keys it will overwrite them
      }
      return mem //returns the member if it doesnt match the mem.id
    }))
    setEditing(null) //sets edit state to null so it doesnt hold on to id value when you edit a new person
    
    // ✨ This takes the values of the form and replaces the data of the
    // member in the `members` state whose id matches the `editing` state
  }
  const onSubmit = evt => { //added to the form to handle submit functions
    evt.preventDefault() //prevents page from refreshing
    if (editing) { //if editing it true aka populated with and id value
      editExistingMember() //call this function
    } else {
      submitNewMember() //else submit a new member
    }
    setInputValue(initialValue()) //resets the input values to be empty
    

    console.log(members)
    // ✨ This is the submit handler for your form element.
    // It will call either `submitNewMember` or `editExistingMember`
    // depending on whether the `editing` state is null or has an id in it.
    // Don't allow the page to reload! Prevent the default behavior
    // and clean up the form after submitting
  }
  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                {/* the line below uses the edit function and passes the member id as the value */}
                <button onClick={() => edit(mem.id)}>Edit</button> add
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
            <input
              id="fname"
              type="text"
              placeholder="Type First Name"
              onChange={onChange}
              name='fname'
              value={inputValue.fname}
            />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input
              id="lname"
              type="text"
              placeholder="Type Last Name"
              onChange={onChange}
              name='lname'
              value={inputValue.lname}
            />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea
              id="bio"
              placeholder="Type Bio"
              onChange={onChange}
              name='bio'
              value={inputValue.bio}
            />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
