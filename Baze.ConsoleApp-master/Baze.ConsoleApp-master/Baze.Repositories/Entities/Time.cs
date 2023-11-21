using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Baze.Repositories.Entities
{
    public class Time
    {
        public int Id { get; set; }
        public double Hour { get; set; }
        public int MedicineUsageId { get; set; }
        public virtual MedicineUsage MedicineUsage { get; set; }
    }
}
