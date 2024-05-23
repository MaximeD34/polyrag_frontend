import { useState, useEffect, useRef } from "react";
import AddFileModal from "../components/AddFileModal";
import DeleteFileModal from "../components/DeleteFileModal";
import UpdateFileModal from "../components/UpdateFileModal";
import io from "socket.io-client";

function FilesSection({
  fileList,
  selectedFileIds,
  setSelectedFileIds,
  isPublicMode,
  avatarMenuOpen,
  refreshPrivateFiles,
  private_files_status,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [file_to_delete, setFileToDelete] = useState(null);
  const [file_name_to_delete, setFileNameToDelete] = useState(null);

  const [file_to_update, setFileToUpdate] = useState(null);
  const [file_name_to_update, setFileNameToUpdate] = useState(null);
  const [file_is_public_to_update, setFileIsPublicToUpdate] = useState(null);

  const [status, setStatus] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Clean up function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isLargeScreen = windowWidth >= 1024; // Tailwind's lg breakpoint

  const handleCheckboxChange = (e, file) => {
    if (e.target.checked) {
      setSelectedFileIds([...selectedFileIds, file.id]);
    } else {
      setSelectedFileIds(selectedFileIds.filter((id) => id !== file.id));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedFileIds(fileList.map((file) => file.id));
    } else {
      setSelectedFileIds([]);
    }
  };

  const areAllChecked =
    fileList.length > 0 && selectedFileIds.length === fileList.length;

  const socket = io("http://localhost:5000");

  socket.on("embedding_status", function (data) {
    setStatus(data);
  });

  console.log("status", status);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-7 mb-12">
      Test
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Select the files you want to query
          </h3>
          <p className="text-gray-600 mt-2">
            {isPublicMode
              ? "These are the files shared by other users"
              : "These are the files you have uploaded"}
          </p>
        </div>

        {!isPublicMode && (
          <div className="mt-3 md:mt-0">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add file
            </button>
          </div>
        )}
      </div>
      {/* Modal */}
      {isAddModalOpen && (
        <AddFileModal
          setIsAddModalOpen={setIsAddModalOpen}
          refreshPrivateFiles={refreshPrivateFiles}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteFileModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          file_id={file_to_delete}
          file_name={file_name_to_delete}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateFileModal
          setIsUpdateModalOpen={setIsUpdateModalOpen}
          file_id={file_to_update}
          file_name={file_name_to_update}
          file_is_public={file_is_public_to_update}
        />
      )}
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 flex items-center gap-x-4">
                <div className="z-10">
                  {(!avatarMenuOpen || isLargeScreen) && (
                    <>
                      <input
                        type="checkbox"
                        id="checkbox-all-items"
                        className="checkbox-item peer hidden"
                        checked={areAllChecked}
                        onChange={handleSelectAll}
                      />
                      <label
                        htmlFor="checkbox-all-items"
                        className="z-10 relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                      ></label>
                    </>
                  )}
                </div>
                File name
              </th>
              <th className="py-3 px-6">Publique ?</th>
              <th className="py-3 px-6">Author</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {fileList
              .sort((a, b) => a.id - b.id)
              .map((item, idx) => (
                <tr key={idx} className="odd:bg-gray-50 even:bg-white">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
                    <div>
                      {(!avatarMenuOpen || isLargeScreen) && (
                        <>
                          <input
                            type="checkbox"
                            id={`checkbox-${idx}`}
                            name={`checkbox-${idx}`}
                            className="z-10 checkbox-item peer hidden"
                            checked={selectedFileIds.includes(item.id)}
                            onChange={(e) => handleCheckboxChange(e, item)}
                          />
                          <label
                            htmlFor={`checkbox-${idx}`}
                            className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                          ></label>
                        </>
                      )}
                    </div>
                    {item.file_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.is_public ? "Oui" : "Non"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.author}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {
                      //if status is null, print "Done" everywhere
                      //if status is not null, print the status of the file if it is
                      //in the status object, else print "Done"
                      (() => {
                        const fileStatus = private_files_status.find(
                          (s) => s.file_id === item.id
                        );
                        if (status === null) {
                          return fileStatus ? fileStatus.status : "Done";
                        } else if (item.id === status.file_id) {
                          if (status.status === "done") {
                            return "Done";
                          } else if (status.status === "error") {
                            return "Error";
                          } else if (status.status === "pending") {
                            return "Pending";
                          }
                        } else {
                          return fileStatus ? fileStatus.status : "Done";
                        }
                      })()
                    }
                  </td>

                  <td className="text-right px-6 whitespace-nowrap">
                    {!isPublicMode && (
                      <>
                        <button
                          href="javascript:void()"
                          className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                          onClick={() => (
                            setFileToUpdate(item.id),
                            setFileNameToUpdate(item.file_name),
                            setFileIsPublicToUpdate(item.is_public),
                            setIsUpdateModalOpen(true)
                          )}
                        >
                          Edit
                        </button>
                        <button
                          href="javascript:void()"
                          className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                          onClick={() => (
                            setFileToDelete(item.id),
                            setFileNameToDelete(item.file_name),
                            setIsDeleteModalOpen(true)
                          )}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FilesSection;
