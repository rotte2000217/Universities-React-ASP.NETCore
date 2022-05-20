using System.Collections.Generic;

namespace Universities.Services.ExcelService
{
    public interface IExcelService
    {

        /// <summary>
        /// Saves the list of <typeparamref name="T"/> as memory stream and returns the byte array.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <param name="sheetName"></param>
        /// <returns></returns>
        byte[] GetExcelFileContent<T>(List<T> list, string sheetName);
    }
}
