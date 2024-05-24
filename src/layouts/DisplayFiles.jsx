function DisplayFiles({ files }) {
  return (
    <div className="max-w-screen-xl mx-auto ">
      <div className="shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 flex items-center">
                <div className="z-10"></div>
                File name
              </th>
              <th className="py-3 px-6">Page</th>
              <th className="py-3 px-6">Author</th>
              <th className="py-3 px-6">Publique ?</th>
              <th className="py-3 px-6">Score</th>
              <th className="py-3 px-6">Citation</th>

              {/* <th className="py-3 px-6"></th> */}
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {files
              .sort((a, b) => b.score - a.score)
              .map((item, idx) => (
                <tr key={idx} className="odd:bg-gray-50 even:bg-white">
                  <td className="px-6 py-4 whitespace-nowrap ">
                    {item.file_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.page_label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.is_public ? "Oui" : "Non"} {item.file_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {Number((item.score + 1) / 2).toFixed(4)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      style={{
                        overflow: "auto",
                        maxHeight: "200px",
                        maxWidth: "300px",
                        whiteSpace: "normal",
                      }}
                    >
                      {item.citation}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayFiles;
