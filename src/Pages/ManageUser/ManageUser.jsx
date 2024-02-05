import { AiFillDelete } from "react-icons/ai";

const ManageUser = () => {
    return (
        <div className="w-[600px] mx-auto">
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
	<h2 className="mb-8 text-4xl  font-semibold leadi text-center">Manage Users</h2>
	<div className="overflow-x-auto">
		<table className="min-w-full text-xs">
			<colgroup className="w-20">
				<col />
				<col className=""/>
                <col/>
				
				<col  />
			</colgroup>
			<thead className="dark:bg-gray-700">
				<tr className="text-left">
					<th className="p-3">Name</th>
					<th className="p-3">Date</th>
					<th className="p-3">Status</th>
                    <th className="p-4">Action</th>
				</tr>
			</thead>
			<tbody>
				
				<tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
					
					<td className="p-3">
						<p>01 Feb 2022</p>
						<p className="dark:text-gray-400">Tuesday</p>
					</td>
					<td className="">
						<span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
							<span>Pending</span>
						</span>
					</td>
					<td className="">
						<span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
							<span>Pending</span>
						</span>
					</td>
                    <td className="p-3">
						<span className=" p-4 py-1 font-semibold text-center flex items-center dark:bg-red-400 dark:text-white rounded-sm ">
							<span className="flex items-center text-center" >Delete <AiFillDelete/></span>
						</span>
					</td>
                    
				</tr>
			</tbody>
		</table>
	</div>
</div>
        </div>
    );
};

export default ManageUser;