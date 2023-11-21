
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Baze.Repositories.Entities
{
    //אופן השימוש המטופל בתרופה 
    public class MedicineUsage
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public virtual ICollection<Time> Hours { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }  
        public virtual Medicine Medicine { get; set; }
        public virtual Client Client { get; set; }
        public int ClientId { get; set; }
        public int MedicineId { get; set; }
    }
}
