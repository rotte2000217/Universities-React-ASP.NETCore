using System.Collections.Generic;

namespace Universities.Services.ExcelService
{
    public interface IExcelService
    {
        byte[] GetExcelFileContent<T>(List<T> list, string sheetName);
    }
}
