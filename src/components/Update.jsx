import { useLoaderData } from "react-router-dom";

const Update = () => {
    const loadedUser = useLoaderData();
    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        console.log(name, email);
        const updateUser = { name, email }
        //update data to server side ---------
        fetch(`http://localhost:5000/users/${loadedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.modifiedCount > 0){
                    alert('usccessfully updated user');
                    form.reset();
                }
            })
            //------------------------------------------------

    }

    return (
        <div>
            <h3>Update information of {loadedUser.name}</h3>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" defaultValue={loadedUser?.name} id="" placeholder="name" />
                <br />
                <input type="email" name="email" defaultValue={loadedUser?.email} id="" placeholder="email" />
                <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};
export default Update;