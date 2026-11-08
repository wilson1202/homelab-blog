---
title: 安装 ESXi 虚拟机
createTime: 2025/05/28 22:14:35
permalink: /article/emqdmjcr/
tags:
  - esxi
  - vm
---
## ESXi 镜像下载

下载相关操作指引，详见官网：

[VMware vSphere downloads, VMware Converter, OEM custom images, patches and addons](https://knowledge.broadcom.com/external/article/366685){.read-more}

::: info 目前博通在 **ESXi 8.0 Update 3e** 中提供了免费版，下载链接：[8.0U3e](https://support.broadcom.com/group/ecx/productfiles?subFamily=VMware%20vSphere%20Hypervisor&displayGroup=VMware%20vSphere%20Hypervisor&release=8.0U3e&os=&servicePk=&language=EN&freeDownloads=true)（登录后勾选使用协议下载）

版本说明：BroadCom 提供了 **VMware VSphere Hypervisor** 版本 8（入门级管理程序）。 该产品没有 Broadcom 的支持，它用于非生产使用。 vSphere 管理程序无法连接到 vCenter，因此无法进行集中管理。您可以使用 VMware 主机客户端远程管理单个 VSphere Hypervisor 主机。 VSPHERE管理程序最多支持每个虚拟机的8个虚拟CPU。您可以从 Broadcom [支持门户](https://support.broadcom.com/group/ecx/free-downloads) 免费下载它。

:::

::: details ESXi 8.0 版本清单

|    **Version**     |                       **Release Name**                       | **Release Date** | **Build Number** | **Available as** |
| :----------------: | :----------------------------------------------------------: | :--------------: | ---------------- | :--------------: |
|    ESXi 8.0 P05    | [ESXi 8.0 Update 3e](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80u3e-release-notes.html) |    2025/04/10    | 24674464         |     **ISO**      |
|   ESXi 8.0.3 EP4   | [ESXi 8.0 Update 3d](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80u3d-release-notes.html) |    2025/03/04    | 24585383         |      Patch       |
| ESXi 8.0 Update 2d | [ESXi 8.0 Update 2d](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80u2d-release-notes.html) |    2025/03/04    | 24585300         |      Patch       |
|   ESXi 8.0.3 EP3   | [ESXi 8.0 Update 3c](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80u3c-release-notes.html) |    2024/12/12    | 24414501         |      Patch       |
|    ESXi 8.0.0e     | [ESXi 8.0e](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80e-release-notes.html) |    2025/03/11    | 24569005         |     **ISO**      |
|   ESXi 8.0.3 P04   | [ESXi 8.0 Update 3b ](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80u3b-release-notes.html) |    2024/09/17    | 24280767         |     **ISO**      |
|     ESXi 8.0.3     | [ESXi 8.0 Update 3](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-803-release-notes.html) |    2024/06/25    | 24022510         |     **ISO**      |
|   ESXi 8.0.2 EP2   | [ESXi 8.0 Update 2c](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80u2c-release-notes.html) |    2024/05/21    | 23825572         |      Patch       |
|   ESXi 8.0.1 U1d   | [ESXi 8.0 Update 1d](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80u1d-release-notes.html) |    2024/03/05    | 23299997         |      Patch       |
|   ESXi 8.0.2 P03   | [ESXi 8.0 Update 2b](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80u2b-release-notes.html) |    2024/02/29    | 23305546         |     **ISO**      |
|     ESXi 8.0.2     | [ESXi 8.0 Update 2](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-802-release-notes.html) |    2023/09/21    | 22380479         |     **ISO**      |
|   ESXi 8.0.1 P02   | [ESXi 8.0 Update 1c](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80u1c-release-notes.html) |    2023/07/27    | 22088125         |      Patch       |
|   ESXi 8.0.1 EP1   | [ESXi 8.0 Update 1a](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80u1a-release-notes.html) |    2023/06/01    | 21813344         |     **ISO**      |
|     ESXi 8.0.1     | [ESXi 8.0 Update 1](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-801-release-notes.html) |    2023/04/18    | 21495797         |     **ISO**      |
|   ESXi 8.0.0 EP2   | [ESXi 8.0c](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80c-release-notes.html) |    2023/03/30    | 21493926         |      Patch       |
|   ESXi 8.0.0 P01   | [ESXi 8.0b](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80b-release-notes.html) |    2023/02/14    | 21203435         |     **ISO**      |
|   ESXi 8.0.0 EP1   | [ESXi 8.0a](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80a-release-notes.html) |    2022/12/08    | 20842819         |     **ISO**      |
|     ESXi 8.0.0     | [ESXi 8.0 GA](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/vmware-vsphere-80-release-notes.html) |    2022/10/11    | 20513097         |     **ISO**      |

:::

::: details ESXi 7.0 版本清单

|   **Version**   |                       **Release Name**                       | **Release Date** | **Build Number** | **Available as** |
| :-------------: | :----------------------------------------------------------: | :--------------: | :--------------: | :--------------: |
| ESXi 7.0.3 P10  | [ESXi 7.0 Update 3v](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/7-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-70u3v-release-notes.html) |    2025/05/20    |     24723872     |      Patch       |
| ESXi 7.0.3 EP13 | [ESXi 7.0 Update 3s](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/7-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-70u3s-release-notes.html) |    2025/03/04    |     24585291     |      Patch       |
| ESXi 7.0.3 EP12 | [ESXi 7.0 Update 3r](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/7-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-70u3r-release-notes.html) |    2024/12/12    |     24411414     |      Patch       |
| ESXi 7.0.3 P09  | [ESXi 7.0 Update 3q](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/7-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-70u3q-release-notes.html) |    2024/05/21    |     23794027     |      Patch       |
| ESXi 7.0.3 EP11 | [ESXi 7.0 Update 3p](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/7-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-70u3p-release-notes.html) |    2024/04/11    |     23307199     |      Patch       |
| ESXi 7.0.3 P08  | [ESXi 7.0 Update 3o](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/7-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-70u3o-release-notes.html) |    2023/09/28    |     22348816     |      Patch       |
| ESXi 7.0.3 EP10 | [ESXi 7.0 Update 3n](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/7-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-70u3n-release-notes.html) |    2023/07/07    |     21930508     |     **ISO**      |
| ESXi 7.0.3 EP9  | [ESXi 7.0 Update 3m](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/7-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-70u3m-release-notes.html) |    2023/05/03    |     21686933     |      Patch       |
| ESXi 7.0.3 P07  | [ESXi 7.0 Update 3l](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/7-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-70u3l-release-notes.html) |    2023/03/30    |     21424296     |     **ISO**      |
| ESXi 7.0.3 EP8  | [ESXi 7.0 Update 3k](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u3k-release-notes.pdf) |    2023/02/21    |     21313628     |      Patch       |
| ESXi 7.0.3 EP7  | [ESXi 7.0 Update 3j](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u3j-release-notes.pdf) |    2023/01/31    |     21053776     |      Patch       |
| ESXi 7.0.3 P06  | [ESXi 7.0 Update 3i](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u3i-release-notes.pdf) |    2022/12/08    |     20842708     |      Patch       |
| ESXi 7.0.3 EP5  | [ESXi 7.0 Update 3g](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u3g-release-notes.pdf) |    2022/09/01    |     20328353     |     **ISO**      |
| ESXi 7.0.3 P05  | [ESXi 7.0 Update 3f](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u3f-release-notes.pdf) |    2022/07/12    |     20036589     |     **ISO**      |
| ESXi 7.0.3 EP4  | [ESXi 7.0 Update 3e](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u3e-release-notes.pdf) |    2022/06/14    |     19898904     |      Patch       |
| ESXi 7.0.3 P04  | [ESXi 7.0 Update 3d](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u3d-release-notes.pdf) |    2022/03/29    |     19482537     |     **ISO**      |
| ESXi 7.0.2 EP3  | [ESXi 7.0 Update 2e](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u2e-release-notes.pdf) |    2022/02/15    |     19290878     |      Patch       |
| ESXi 7.0.1 EP4  | [ESXi 7.0 Update 1e](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u1e-release-notes.pdf) |    2022/02/15    |     19324898     |      Patch       |
| ESXi 7.0.3 U3c  | [ESXi 7.0 Update 3c](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u3c-release-notes.pdf) |    2022/01/27    |     19193900     |     **ISO**      |
| ESXi 7.0.2 EP2  | [ESXi 7.0 Update 2d](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u2d-release-notes.pdf) |    2021/09/14    |     18538813     |      Patch       |
| ESXi 7.0.2 P03  | [ESXi 7.0 Update 2c](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u2c-release-notes.pdf) |    2021/08/24    |     18426014     |      Patch       |
| ESXi 7.0.2 EP1  | [ESXi 7.0 Update 2a](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u2a-release-notes.pdf) |    2021/04/29    |     17867351     |     **ISO**      |
|   ESXi 7.0.2    | [ESXi 7.0 Update 2](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-702-release-notes.pdf) |    2021/03/09    |     17630552     |      Patch       |
| ESXi 7.0.1 EP3  | [ESXi 7.0 Update 1d](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u1d.pdf) |    2021/02/02    |     17551050     |      Patch       |
| ESXi 7.0.1 P02  | [ESXi 7.0 Update 1c](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u1c.pdf) |    2020/12/17    |     17325551     |     **ISO**      |
| ESXi 7.0.1 EP2  | [ESXi 7.0 Update 1b](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u1b.pdf) |    2020/11/19    |     17168206     |      Patch       |
| ESXi 7.0.1 EP1  | [ESXi 7.0 Update 1a](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-70u1a.pdf) |    2020/11/04    |     17119627     |      Patch       |
|   ESXi 7.0.1    | [ESXi 7.0 Update 1](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-701-release-notes.pdf) |    2020/10/06    |     16850804     |     **ISO**      |
| ESXi 7.0.0 P01  | [ESXi 7.0b](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/esxi70b.pdf) |    2020/06/23    |     16324942     |     **ISO**      |
|   ESXi 7.0.0    | [ESXi 7.0 GA](https://techdocs.broadcom.com/content/dam/broadcom/techdocs/us/en/pdf/vmware/vsphere/vsphere/vSphere-Release-Notes/vsphere-esxi-vcenter-server-70-release-notes.pdf) |    2020/04/02    |     15843807     |      **-**       |

:::

::: details ESXi 6.7 及更早版本清单

|              **Version**              |        **Release Name**        | **Release Date** | **Build Number** | **Available as** |
| :-----------------------------------: | :----------------------------: | :--------------: | :--------------: | :--------------: |
|             ESXi 6.7 P08              |       ESXi670-202210001        |    2022/10/06    |     20497097     |      Patch       |
|            ESXi 6.7 EP 24             |       ESXi670-202207001        |    2022/07/12    |     19997733     |      Patch       |
|             ESXi 6.7 P07              |       ESXi670-202206001        |    2022/06/14    |     19898906     |      Patch       |
|            ESXi 6.7 EP 23             |       ESXi670-202201001        |    2022/01/25    |     19195723     |      Patch       |
|             ESXi 6.7 P06              |       ESXi670-202111001        |    2021/11/23    |     18828794     |      Patch       |
|             ESXi 6.7 P05              |       ESXi670-202103001        |    2021/03/18    |     17700523     |      Patch       |
|            ESXi 6.7 EP 18             |       ESXi670-202102001        |    2021/02/23    |     17499825     |      Patch       |
|             ESXi 6.7 P04              |       ESXi 670-202011002       |    2020/11/19    |     17167734     |      Patch       |
|            ESXi 6.7 EP 17             |       ESXi670-202011001        |    2020/11/04    |     17098360     |      Patch       |
|            ESXi 6.7 EP 16             |       ESXi670-202010001        |    2020/10/15    |     16773714     |      Patch       |
|             ESXi 6.7 P03              |       ESXi670-202008001        |    2020/08/20    |     16713306     |      Patch       |
|            ESXi 6.7 EP 15             |       ESXi670-202006001        |    2020/06/09    |     16316930     |      Patch       |
|             ESXi 6.7 P02              |       ESXi670-202004002        |    2020/04/28    |     16075168     |      Patch       |
|            ESXi 6.7 EP 14             |       ESXi670-202004001        |    2020/04/07    |     15820472     |      Patch       |
|       ESXi 6.7 P01 (Update 3b)        |       ESXi670-201912001        |    2019/12/05    |     15160138     |     **ISO**      |
|            ESXi 6.7 EP 13             |       ESXi670-201911001        |    2019/11/12    |     15018017     |      Patch       |
|           ESXi 6.7 Update 3           |          ESXi 6.7 U3           |    2019/08/20    |     14320388     |     **ISO**      |
|            ESXi 6.7 EP 10             |       ESXi670-201906002        |    2019/06/20    |     13981272     |      Patch       |
|            ESXi 6.7 EP 09             |       ESXi670-201905001        |    2019/05/14    |     13644319     |      Patch       |
|            ESXi 6.7 EP 08             |       ESXi670-201904001        |    2019/04/30    |     13473784     |      Patch       |
|              ESXi 6.7 U2              |          ESXi 6.7 U2           |    2019/04/11    |     13006603     |     **ISO**      |
|            ESXi 6.7 EP 07             |       ESXi670-201903001        |    2019/03/28    |     13004448     |      Patch       |
|            ESXi 6.7 EP 06             |       ESXi670-201901001        |    2019/01/17    |     11675023     |      Patch       |
|            ESXi 6.7 EP 05             |       ESXi670-201811001        |    2018/11/09    |     10764712     |      Patch       |
|              ESXi 6.7 U1              |          ESXi 6.7 U1           |    2018/10/16    |     10302608     |     **ISO**      |
|            ESXi 6.7 EP 04             |       ESXi670-201810001        |    2018/10/02    |     10176752     |      Patch       |
|            ESXi 6.7 EP 03             |       ESXi670-201808001        |    2018/08/14    |     9484548      |      Patch       |
|            ESXi 6.7 EP 02a            |       ESXi670-201807001        |    2018/07/26    |     9214924      |      Patch       |
|            ESXi 6.7 EP 02             |       ESXi670-201806001        |    2018/06/28    |     8941472      |      Patch       |
|              ESXi 6.7 GA              |          ESXi 6.7 GA           |    2018/04/17    |     8169922      |     **ISO**      |
|             ESXi 6.5 P09              |       ESXi650-202210001        |    2022/10/06    |     20502893     |      Patch       |
|             ESXi 6.5 EP27             |       ESXi650-202207001        |    2022/07/12    |     19997716     |      Patch       |
|             ESXi 6.5 P08              |       ESXi650-202205001        |    2022/05/12    |     19588618     |      Patch       |
|             ESXi 6.5 EP26             |       ESXi650-202202001        |    2022/02/15    |     19092475     |      Patch       |
|             ESXi 6.5 P07              |       ESXi650-202110001        |    2021/10/12    |     18678235     |      Patch       |
|            ESXi 6.5 EP 24             |       ESXi650-202107001        |    2021/07/13    |     18071574     |      Patch       |
|             ESXi 6.5 P06              |       ESXi650-202102001        |    2021/02/23    |     17477841     |      Patch       |
|            ESXi 6.5 EP 23             |       ESXi 650-202011002       |    2020/11/19    |     17167537     |      Patch       |
|            ESXi 6.5 EP 22             |       ESXi650-202011001        |    2020/11/04    |     17097218     |      Patch       |
|            ESXi 6.5 EP 21             |       ESXi650-202010001        |    2020/10/15    |     16901156     |      Patch       |
|             ESXi 6.5 P05              |       ESXi650-202007001        |    2020/07/30    |     16576891     |      Patch       |
|            ESXi 6.5 EP 20             |       ESXi650-202006001        |    2020/06/30    |     16389870     |      Patch       |
|            ESXi 6.5 EP 19             |       ESXi650-202005001        |    2020/05/28    |     16207673     |      Patch       |
|             ESXi 6.5 P04              |       ESXi650-201912002        |    2019/12/19    |     15256549     |      Patch       |
|            ESXi 6.5 EP 18             |       ESXi650-201912001        |    2019/12/05    |     15177306     |      Patch       |
|            ESXi 6.5 EP 17             |       ESXi650-201911001        |    2019/11/12    |     14990892     |      Patch       |
|            ESXi 6.5 EP 16             |       ESXi650-201910001        |    2019/10/24    |     14874964     |      Patch       |
|      ESXi 6.5 EP 15 (Update 3a)       |       ESXi650-201908001        |    2019/08/20    |     14320405     |     **ISO**      |
|           ESXi 6.5 Update 3           |       ESXi 6.5 Update 3        |    2019/07/02    |     13932383     |     **ISO**      |
|            ESXi 6.5 EP 14             |       ESXi650-201905001        |    2019/05/14    |     13635690     |      Patch       |
|            ESXi 6.5 EP 13             |       ESXi650-201903001        |    2019/03/28    |     13004031     |      Patch       |
|            ESXi 6.5 EP 12             |       ESXi650-201901001        |    2019/01/31    |     11925212     |      Patch       |
|             ESXi 6.5 P03              |       ESXi650-201811002        |    2018/11/29    |     10884925     |      Patch       |
|            ESXi 6.5 EP 11             |       ESXi650-201811001        |    2018/11/09    |     10719125     |      Patch       |
|            ESXi 6.5 EP 10             |       ESXi650-201810002        |    2018/10/23    |     10390116     |      Patch       |
|            ESXi 6.5 EP 09             |       ESXi650-201810001        |    2018/10/02    |     10175896     |      Patch       |
|          ESXi 6.5 Update 2c           |       ESXi650-201808001        |    2018/08/14    |     9298722      |      Patch       |
|          ESXi 6.5 Update 2b           |       ESXi650-201806001        |    2018/06/28    |     8935087      |      Patch       |
|           ESXi 6.5 Update 2           |         ESXi 6.5 U2 GA         |    2018/05/03    |     8294253      |     **ISO**      |
|          ESXi 6.5 Update 1g           |       ESXi650-201803001        |    2018/03/20    |     7967591      |      Patch       |
|           ESXi 6.5 Patch 02           |       ESXi650-201712001        |    2017/12/19    |     7388607      |      Patch       |
|      ESXi 6.5 U1 Express Patch 4      |       ESXi650-201710001        |    2017/10/05    |     6765664      |      Patch       |
|           ESXi 6.5 Update 1           |          ESXi 6.5 U1           |    2017/07/27    |     5969303      |     **ISO**      |
|              ESXi 6.5.0d              |       ESXi650-201704001        |    2017/04/18    |     5310538      |     **ISO**      |
|      ESXi 6.5. Express Patch 1a       |       ESXi650-201703002        |    2017/03/28    |     5224529      |      Patch       |
|          ESXi 6.5. Patch 01           |       ESXi650-201703001        |    2017/03/09    |     5146846      |      Patch       |
|              ESXi 6.5.0a              |       ESXi650-201701001        |    2017/02/02    |     4887370      |     **ISO**      |
|              ESXi 6.5 GA              |          ESXi 6.5 GA           |    2016/11/15    |     4564106      |     **ISO**      |
|            ESXi 6.0 EP 25             |       ESXi600-202002001        |    2020/02/20    |     15517548     |                  |
|            ESXi 6.0 EP 23             |       ESXi600-201912001        |    2019/12/05    |     15169789     |                  |
|             ESXi 6.0 P08              |       ESXi600-201909001        |    2019/09/12    |     14513180     |                  |
|            ESXi 6.0 EP 22             |       ESXi600-201911001        |    2019/11/12    |     15018929     |                  |
|            ESXi 6.0 EP 21             |       ESXi600-201905001        |    2019/05/14    |     13635687     |                  |
|            ESXi 6.0 EP 20             |       ESXi600-201903001        |    2019/03/28    |     13003896     |                  |
|            ESXi 6.0 EP 19             |       ESXi600-201811001        |    2018/11/09    |     10719132     |                  |
|            ESXi 6.0 EP 18             |       ESXi600-201810001        |    2018/10/23    |     10474991     |                  |
|            ESXi 6.0 EP 17             |       ESXi600-201809001        |    2018/09/13    |     9919195      |                  |
|            ESXi 6.0 EP 15             |       ESXi600-201808001        |    2018/08/14    |     9313334      |                  |
|             ESXi 6.0 P07              |       ESXi600-201807001        |    2018/07/26    |     9239799      |                  |
|             ESXi 6.0 U3f              |       ESXi600-201806001        |    2018/06/28    |     8934903      |                  |
|             ESXi 6.0 U3e              |       ESXi600-201803001        |    2018/03/20    |     7967664      |                  |
|             ESXi 6.0 U3d              |       ESXi600-201801001        |    2018/01/09    |     7504637      |                  |
|           ESXi 6.0 Patch 6            |       ESXi600-201711001        |    2017/11/09    |     6921384      |                  |
|       ESXi 6.0 Express Patch 11       |       ESXi600-201710001        |    2017/10/05    |     6765062      |                  |
| ESXi 6.0 Update 3a (ESXi 6.0 Patch 5) |       ESXi600-201706001        |    2017/06/06    |     5572656      |                  |
|       ESXi 6.0 Express Patch 7c       |       ESXi600-201703003        |    2017/03/28    |     5251623      |                  |
|  ESXi 6.0 Update 1 (VMSA-2017-0006)   |       ESXi600-201703002        |    2017/03/28    |     5251621      |                  |
|       ESXi 6.0 Express Patch 7a       |       ESXi600-201703001        |    2017/03/28    |     5224934      |                  |
|           ESXi 6.0 Update 3           |       ESXi 6.0 Update 3        |    2017/02/24    |     5050593      |                  |
|           ESXi 6.0 Patch 4            |       ESXi600-201611001        |    2016/11/22    |     4600944      |                  |
|       ESXi 6.0 Express Patch 7        |       ESXi600-201610001        |    10/17/2016    |     4510822      |                  |
|           ESXi 6.0 Patch 3            |       ESXi600-201608001        |    2016/08/04    |     4192238      |                  |
|       ESXi 6.0 Express Patch 6        |       ESXi600-201605001        |    2016/05/12    |     3825889      |                  |
|           ESXi 6.0 Update 2           |       ESXi 6.0 Update 2        |    2016/03/16    |     3620759      |                  |
|       ESXi 6.0 Express Patch 5        |       ESXi600-201602001        |    2016/02/23    |     3568940      |                  |
|          ESXi 6.0 Update 1b           |       ESXi600-201601001        |    2016/01/07    |     3380124      |                  |
|       ESXi 6.0 Express Patch 4        |       ESXi600-201511001        |    2015/11/25    |     3247720      |                  |
|    ESXi 6.0 U1a (Express Patch 3)     |       ESXi600-201510001        |    2015/10/06    |     3073146      |                  |
|              ESXi 6.0 U1              |          ESXi 6.0 U1           |    2015/09/10    |     3029758      |                  |
|              ESXi 6.0.0b              |       ESXi600-201507001        |    2015/07/07    |     2809209      |                  |
|       ESXi 6.0 Express Patch 2        |       ESXi600-201505001        |    2015/05/14    |     2715440      |                  |
|       ESXi 6.0 Express Patch 1        |       ESXi600-201504001        |    2015/04/09    |     2615704      |                  |
|              ESXi 6.0 GA              |          ESXi 6.0 GA           |    2015/03/12    |     2494585      |                  |
|             ESXi 5.5 U3k              |       ESXi550-201809001        |    2018/09/14    |     9919047      |                  |
|             ESXi 5.5 U3J              |       ESXi550-201808001        |    2018/08/14    |     9313066      |                  |
|             ESXi 5.5 U3i              |       ESXi550-201806001        |    2018/06/28    |     8934887      |                  |
|             ESXi 5.5 U3h              |       ESXi550-201803001        |    2018/03/20    |     7967571      |                  |
|       ESXi 5.5 Express Patch 13       |       ESXi550-201801002        |    2018/01/22    |     7618464      |                  |
|          ESXi 5.5 Update 3f           |       ESXi550-201709001        |    2017/09/14    |     6480324      |                  |
|       ESXi 5.5 Express Patch 11       |       ESXi550-201703001        |    2017/03/28    |     5230635      |                  |
|           ESXi 5.5 Patch 10           |       ESXi550-201612001        |    2016/12/20    |     4722766      |                  |
|           ESXi 5.5 Patch 9            |       ESXi550-201609001        |    2016/09/15    |     4345813      |                  |
|           ESXi 5.5 Patch 8            |       ESXi550-201608001        |    2016/08/04    |     4179633      |                  |
|       ESXi 5.5 Express Patch 10       |       ESXi550-201602001        |    2016/02/21    |     3568722      |                  |
|       ESXi 5.5 Express Patch 9        |       ESXi550-201601001        |    2016/01/04    |     3343343      |                  |
|          ESXi 5.5 Update 3b           |       ESXi550-201512001        |    2015/12/08    |     3248547      |                  |
|          ESXi 5.5 Update 3a           |       ESXi550-201510001        |    2015/10/06    |     3116895      |                  |
|           ESXi 5.5 Update 3           |       ESXi 5.5 Update 3        |    2015/09/16    |     3029944      |                  |
|      ESXi 5.5 Patch 5 re-release      |       ESXi550-201505002        |    2015/05/08    |     2718055      |                  |
|       ESXi 5.5 Express Patch 7        |       ESXi550-201504001        |    2015/04/07    |     2638301      |                  |
|       ESXi 5.5 Express Patch 6        |       ESXi550-201502001        |    2015/02/05    |     2456374      |                  |
|           ESXi 5.5 Patch 4            |       ESXi550-201501001        |    2015/01/27    |     2403361      |                  |
|       ESXi 5.5 Express Patch 5        |       ESXi550-201412001        |    2014/12/02    |     2302651      |                  |
|           ESXi 5.5 Patch 3            |       ESXi550-201410001        |    2014/10/15    |     2143827      |                  |
|           ESXi 5.5 Update 2           |       ESXi 5.5 Update 2        |    2014/09/09    |     2068190      |                  |
|           ESXi 5.5 Patch 2            |       ESXi550-201407001        |    2014/07/01    |     1892794      |                  |
|       ESXi 5.5 Express Patch 4        |       ESXi550-201406001        |    2014/06/10    |     1881737      |                  |
|          ESXi 5.5 Update 1a           |       ESXi550-201404001        |    2014/04/19    |     1746018      |                  |
|       ESXi 5.5 Express Patch 3        |       ESXi550-201404020        |    2014/04/19    |     1746974      |                  |
|           ESXi 5.5 Update 1           |       ESXi 5.5 Update 1        |    2014/03/11    |     1623387      |                  |
|           ESXi 5.5 Patch 1            |       ESXi550-201312001        |    2013/12/22    |     1474528      |                  |
|              ESXi 5.5 GA              |          ESXi 5.5 GA           |    2013/09/22    |     1331820      |                  |
|           ESXi 5.1 Patch 9            |        ESXi 5.1 Patch 9        |    2016/05/24    |     3872664      |                  |
|           ESXi 5.1 Patch 8            |        ESXi 5.1 Patch 8        |    2015/10/01    |     3070626      |                  |
|           ESXi 5.1 Patch 7            |        ESXi 5.1 Patch 7        |    2015/03/26    |     2583090      |                  |
|           ESXi 5.1 Update 3           |       ESXi 5.1 Update 3        |    2014/12/04    |     2323236      |                  |
|           ESXi 5.1 Patch 6            |        ESXi 5.1 Patch 6        |    2014/10/30    |     2191751      |                  |
|           ESXi 5.1 Patch 5            |        ESXi 5.1 Patch 5        |    2014/07/31    |     2000251      |                  |
|       ESXi 5.1 Express Patch 5        |    ESXi 5.1 Express Patch 5    |    2014/06/17    |     1900470      |                  |
|           ESXi 5.1 Patch 4            |        ESXi 5.1 Patch 4        |    2014/04/29    |     1743533      |                  |
|       ESXi 5.1 Express Patch 4        |    ESXi 5.1 Express Patch 4    |    2014/02/27    |     1612806      |                  |
|           ESXi 5.1 Update 2           |       ESXi 5.1 Update 2        |    2014/01/16    |     1483097      |                  |
|           ESXi 5.1 Patch 3            |        ESXi 5.1 Patch 3        |    2013/10/17    |     1312873      |                  |
|           ESXi 5.1 Patch 2            |        ESXi 5.1 Patch 2        |    2013/07/25    |     1157734      |                  |
|       ESXi 5.1 Express Patch 3        |    ESXi 5.1 Express Patch 3    |    2013/05/23    |     1117900      |                  |
|           ESXi 5.1 Update 1           |       ESXi 5.1 Update 1        |    2013/04/25    |     1065491      |                  |
|       ESXi 5.1 Express Patch 2        |    ESXi 5.1 Express Patch 2    |    2013/03/07    |     1021289      |                  |
|           ESXi 5.1 Patch 1            |        ESXi 5.1 Patch 1        |    2012/12/20    |      914609      |                  |
|              ESXi 5.1.0a              |          ESXi 5.1.0a           |    2012/10/25    |      838463      |                  |
|             ESXi 5.1.0 GA             |         ESXi 5.1.0 GA          |    2012/09/10    |      799733      |                  |
|           ESXi 5.0 Patch 13           |       ESXi 5.0 Patch 13        |    2016/06/14    |     3982828      |                  |
|           ESXi 5.0 Patch 12           |       ESXi 5.0 Patch 12        |    2015/10/01    |     3086167      |                  |
|           ESXi 5.0 Patch 11           |       ESXi 5.0 Patch 11        |    2015/02/24    |     2509828      |                  |
|           ESXi 5.0 Patch 10           |       ESXi 5.0 Patch 10        |    2014/12/04    |     2312428      |                  |
|           ESXi 5.0 Patch 9            |        ESXi 5.0 Patch 9        |    2014/08/28    |     2000308      |                  |
|       ESXi 5.0 Express Patch 6        |    ESXi 5.0 Express Patch 6    |    2014/07/01    |     1918656      |                  |
|           ESXi 5.0 Patch 8            |        ESXi 5.0 Patch 8        |    2014/05/29    |     1851670      |                  |
|           ESXi 5.0 Patch 7            |        ESXi 5.0 Patch 7        |    2014/01/23    |     1489271      |                  |
|           ESXi 5.0 Update 3           |       ESXi 5.0 Update 3        |    2013/10/17    |     1311175      |                  |
|           ESXi 5.0 Patch 6            |        ESXi 5.0 Patch 6        |    2013/08/29    |     1254542      |                  |
|       ESXi 5.0 Express Patch 5        |    ESXi 5.0 Express Patch 5    |    2013/05/15    |     1117897      |                  |
|           ESXi 5.0 Patch 5            |        ESXi 5.0 Patch 5        |    2013/03/28    |     1024429      |                  |
|           ESXi 5.0 Update 2           |       ESXi 5.0 Update 2        |    2012/12/20    |      914586      |                  |
|           ESXi 5.0 Patch 4            |        ESXi 5.0 Patch 4        |    2012/09/27    |      821926      |                  |
|           ESXi 5.0 Patch 3            |        ESXi 5.0 Patch 3        |    2012/07/12    |      768111      |                  |
|       ESXi 5.0 Express Patch 4        |    ESXi 5.0 Express Patch 4    |    2012/06/14    |      721882      |                  |
|       ESXi 5.0 Express Patch 3        |    ESXi 5.0 Express Patch 3    |    2012/05/03    |      702118      |                  |
|       ESXi 5.0 Express Patch 2        |    ESXi 5.0 Express Patch 2    |    2012/04/12    |      653509      |                  |
|           ESXi 5.0 Update 1           |       ESXi 5.0 Update 1        |    2012/03/15    |      623860      |                  |
|           ESXi 5.0 Patch 2            |        ESXi 5.0 Patch 2        |    2011/12/15    |      515841      |                  |
|       ESXi 5.0 Express Patch 1        |    ESXi 5.0 Express Patch 1    |    2011/11/03    |      504890      |                  |
|           ESXi 5.0 Patch 1            |        ESXi 5.0 Patch 1        |    2011/09/13    |      474610      |                  |
|              ESXi 5.0 GA              |          ESXi 5.0 GA           |    2011/08/24    |      469512      |                  |
|           ESX 4.1 Patch 11a           |       ESX 4.1 Patch 11a        |    2014/10/01    |     2168595      |                  |
|         ESXi/ESX 4.1 Patch 11         |     ESXi/ESX 4.1 Patch 11      |    2014/04/10    |     1682698      |                  |
|         ESXi/ESX 4.1 Patch 10         |     ESXi/ESX 4.1 Patch 10      |    2013/12/05    |     1363503      |                  |
|         ESXi/ESX 4.1 Patch 9          |      ESXi/ESX 4.1 Patch 9      |    2013/07/31    |     1198252      |                  |
|         ESXi/ESX 4.1 Patch 8          |      ESXi/ESX 4.1 Patch 8      |    2013/04/30    |     1050704      |                  |
|         ESXi/ESX 4.1 Patch 7          |      ESXi/ESX 4.1 Patch 7      |    2013/01/31    |      988178      |                  |
|         ESXi/ESX 4.1 Patch 6          |      ESXi/ESX 4.1 Patch 6      |    2012/11/15    |      874690      |                  |
|     ESXi/ESX 4.1 Express Patch 3      |  ESXi/ESX 4.1 Express Patch 3  |    2012/06/14    |      721871      |                  |
|    ESXi/ESX 4.1 Express Patch 2-1     | ESXi/ESX 4.1 Express Patch 2-1 |    2012/05/03    |      702113      |                  |
|         ESXi/ESX 4.1 Patch 5          |      ESXi/ESX 4.1 Patch 5      |    2012/04/26    |      659051      |                  |
|         ESXi/ESX 4.1 Patch 4          |      ESXi/ESX 4.1 Patch 4      |    2012/01/30    |      582267      |                  |
|         ESXi/ESX 4.1 Update 3         |     ESXi/ESX 4.1 Update 3      |    2012/08/30    |      800380      |                  |
|         ESXi/ESX 4.1 Update 2         |     ESXi/ESX 4.1 Update 2      |    2011/10/27    |      502767      |                  |
|         ESXi/ESX 4.1 Patch 3          |      ESXi/ESX 4.1 Patch 3      |    2011/07/28    |      433742      |                  |
|           ESXi 4.1 Patch 2            |        ESXi 4.1 Patch 2        |    2011/04/28    |      381591      |                  |
|            ESX 4.1 Patch 2            |        ESX 4.1 Patch 2         |    2011/04/28    |      381591      |                  |
|           ESXi 4.1 Update 1           |       ESXi 4.1 Update 1        |    2011/02/10    |      351620      |                  |
|           ESX 4.1 Update 1            |        ESX 4.1 Update 1        |    2011/02/10    |      351621      |                  |
|        ESX 4.1 Express Patch 1        |    ESX 4.1 Express Patch 1     |    2010/11/30    |      320381      |                  |
|            ESX 4.1 Patch 1            |        ESX 4.1 Patch 1         |    2010/11/16    |      320092      |                  |
|              ESX 4.1 GA               |           ESX 4.1 GA           |    2010/07/13    |      260247      |                  |
|           ESX 4.0 Patch 15            |        ESX 4.0 Patch 15        |    2014/10/01    |     2167889      |                  |
|           ESX 4.0 Patch 14            |        ESX 4.0 Patch 14        |    2013/10/24    |     1335992      |                  |
|           ESX 4.0 Patch 13            |        ESX 4.0 Patch 13        |    2012/05/30    |     1070634      |                  |
|        ESX 4.0 Express Patch 9        |    ESX 4.0 Express Patch 9     |    2013/02/07    |      989856      |                  |
|           ESX 4.0 Patch 12            |        ESX 4.0 Patch 12        |    2012/09/14    |      787047      |                  |
|        ESX 4.0 Express Patch 8        |    ESX 4.0 Express Patch 8     |    2012/06/14    |      721907      |                  |
|        ESX 4.0 Express Patch 7        |    ESX 4.0 Express Patch 7     |    2012/05/03    |      702116      |                  |
|           ESX 4.0 Patch 11            |        ESX 4.0 Patch 11        |    2012/03/30    |      660575      |                  |
|           ESXi 4.0 Update 4           |       ESXi 4.0 Update 4        |    2011/11/17    |      523315      |                  |
|           ESX 4.0 Patch 10            |        ESX 4.0 Patch 10        |    2011/10/13    |      480973      |                  |
|           ESXi 4.0 Update 3           |       ESXi 4.0 Update 3        |    2011/05/05    |      403554      |                  |
|           ESX 4.0 Update 3            |        ESX 4.0 Update 3        |    2011/05/05    |      403553      |                  |
|            ESX 4.0 Patch 9            |        ESX 4.0 Patch 9         |    2011/03/07    |      360236      |                  |
|            ESX 4.0 Patch 8            |        ESX 4.0 Patch 8         |    2011/01/04    |      332073      |                  |
|            ESX 4.0 Patch 7            |        ESX 4.0 Patch 7         |    2010/09/30    |      294855      |                  |
|           ESX 4.0 Update 2            |        ESX 4.0 Update 2        |    2010/06/10    |      261974      |                  |
|            ESX 4.0 Patch 6            |        ESX 4.0 Patch 6         |    2010/05/27    |      256968      |                  |
|            ESX 4.0 Patch 5            |        ESX 4.0 Patch 5         |    2010/04/01    |      244038      |                  |
|            ESX 4.0 Patch 4            |        ESX 4.0 Patch 4         |    2010/03/03    |      236512      |                  |
|            ESX 4.0 Patch 3            |        ESX 4.0 Patch 3         |    2010/01/06    |      219382      |                  |
|           ESX 4.0 Update 1            |        ESX 4.0 Update 1        |    2009/11/19    |      208167      |                  |
|            ESX 4.0 Patch 2            |        ESX 4.0 Patch 2         |    2009/09/24    |      193498      |                  |
|            ESX 4.0 Patch 1            |        ESX 4.0 Patch 1         |    2009/07/09    |      175625      |                  |
|     ESX 4.0 Eval & Free Download      |  ESX 4.0 Eval & Free Download  |                  |      171294      |                  |
|              ESX 4.0 GA               |           ESX 4.0 GA           |    2009/05/21    |      164009      |                  |

:::

## 调整系统分区

当 ESXi 安装程序窗口出现时，在 5 秒内按 <kbd>Shift + O</kbd> 来编辑启动选项。

在 <kbd>cdromBoot runweasel</kbd> 后面追加 `autoPartitionOSDataSize` 参数 ，以分配 **4G** 空间为例：

```bash
<ENTER: Apply options and boot>
> cdromBoot runweasel autoPartitionOSDataSize=4096  # [!code word:autoPartitionOSDataSize=4096]
```

::: warning 默认单位为 **MB**

:::

::: details 官方配置系统分区方案

如果未指定 systemMediaSize，ESXi 7.0 Update 1c 系统存储默认占用 138GB，这是大多数服务器的推荐大小。更多信息，请参阅 [ESXi 7.0 Update1c release notes](https://docs.vmware.com/en/VMware-vSphere/7.0/rn/vsphere-esxi-70u1c.html#whatsnew)

systemMediaSize 引导选项接受以下参数以及用于 ESXi 系统分区的相应大小：

- `mini`：33GB，适用于单磁盘或嵌入式服务器
- `small`：69GB，适用于至少配备 512GB RAM 的服务器
- `max` ：所有可用空间，适用于多 TB 服务器

**方案一：在安装镜像启动主机时输入参数以调整启动选项**

使用安装镜像启动主机，当 ESXi 安装程序窗口出现时，在 5 秒内按下 <kbd>Shift + O</kbd> 以编辑启动选项。

```bash
<ENTER: Apply options and boot>
> cdromBoot runweasel systemMediaSize=min  # [!code word:systemMediaSize=min]
```

**方案二：修改启动镜像中的「boot.cfg」文件以调整启动选项**

编辑安装镜像中的 **boot.cfg** 文件，并将启动参数添加到 **kernelopt** 行中

```bash
kernelopt=runweasel systemMediaSize=small  # [!code word:systemMediaSize=small]
```

:::

## 参考

- [Build numbers and versions of VMware ESXi/ESX](https://knowledge.broadcom.com/external/article?legacyId=2143832)
- [Boot option to configure the size of ESXi system partitions](https://knowledge.broadcom.com/external/article/345195/boot-option-to-configure-the-size-of-esx.html)