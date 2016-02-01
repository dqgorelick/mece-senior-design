#include "mcu_api.h"
#include "mcu_errno.h"
#include <string.h>

void mcu_main()
{
    /* your configuration code starts here */
    char buf[64];
    int len;

    while (1)       /* your loop code starts here */
    {
        do {
            len = host_receive((unsigned char *)buf, 64);
            mcu_sleep(10);
        } while (len <= 0);
        if (strncmp(buf, "start", 5) == 0)
        {
            debug_print(DBG_INFO, "received start command!\n");
            host_send((unsigned char*)"hello mcu\n", 10);
        }
    }
}
