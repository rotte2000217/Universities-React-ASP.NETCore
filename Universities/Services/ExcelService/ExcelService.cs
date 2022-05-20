using ClosedXML.Excel;
using System.Collections.Generic;
using System.IO;

namespace Universities.Services.ExcelService
{
    public class ExcelService : IExcelService
    {
        public byte[] GetExcelFileContent<T>(List<T> list, string sheetName)
        {
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
