export const ChatMembers = ({ users }: any) => {
	return (
		<div className='activeUsers'>
			<h2 className='headline'>Chat Members ({users.length})</h2>
			<div id='users'>
				<ul>
					{users.map((user: any, index: number) => (
						<li key={user.id}>
							<i className='fas fa-circle'></i>
							<span>{user.name}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
