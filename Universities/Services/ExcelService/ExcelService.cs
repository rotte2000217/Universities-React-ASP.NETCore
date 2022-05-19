using ClosedXML.Excel;
using System.Collections.Generic;
using System.IO;

namespace Universities.Services.ExcelService
{
    public class ExcelService : IExcelService
    {

        /// <summary>
        /// Saves the list of <typeparamref name="T"/> as memory stream and returns the byte array.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <param name="sheetName"></param>
        /// <returns></returns>
        public byte[] GetExcelFileContent<T>(List<T> list, string sheetName)
        {
            MemoryStream memoryStream = new MemoryStream();

            using (IXLWorkbook workbook = new XLWorkbook())
            {
                workbook.AddWorksheet(sheetName).FirstCell().InsertTable<T>(list, false);

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    return content;
                }
            }
        }
    }
}
