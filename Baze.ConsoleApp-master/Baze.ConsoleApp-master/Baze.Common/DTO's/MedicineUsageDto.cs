
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Baze.Common.DTO_s
{
    //אופן השימוש המטופל בתרופה 
    public class MedicineUsageDto
    {
        public int ClientId { get; set; }
        public int MedicineId { get; set; }
        public int Id { get; set; }
        public double Amount { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }  

    }
}
