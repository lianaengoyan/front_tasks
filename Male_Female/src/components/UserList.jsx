export default function UserList({findUsers}) {
    return (
        <ul className='users'>
        {
          findUsers.map((user, index) => (
            <li key={index}>
              {user.name.first} {user.name.last}
            </li>
          ))
        }
      </ul>
    )
}