# Manage tuning profiles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Operate-Running-Systems/Manage-tuning-profiles)

---

## Table of Contents

- Manage tuning profiles
  - TuneD Profile Locations
  - Managing TuneD Profiles with tuned-adm
  - Merging Profiles
  - Dynamic Tuning
  - Watch Video
  - Practice Lab
    - Listing Profiles and Checking the Active Profile
    - Switching Profiles
    - Profile Recommendation and Verification
    - Example: Switching Profiles on a Virtual Machine

---

## Content

Red Hat Certified System Administrator(RHCSA)

Operate Running Systems

# Manage tuning profiles

In this article, you will learn how to manage tuning profiles using TuneD—a powerful service that monitors system performance and optimizes settings for various workloads. TuneD leverages profiles to adjust system behavior, making it easier to fine-tune environments for high throughput, low latency, or power-saving needs.

TuneD profiles cater to two main use cases:

- **Power-saving profiles:** These adjust system settings to reduce energy consumption, for example by disabling inactive devices or enabling low-power hardware modes.
- **Performance-boosting profiles:** These are designed to enhance system performance by reducing storage and network latency or by increasing throughput in environments such as virtualization.

![The image shows a menu from "TuneD" with options for "Power saving profiles" and "Performance-boosting profiles," each accompanied by an icon.](https://kodekloud.com/kk-media/image/upload/v1752883604/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Manage-tuning-profiles/tuned-menu-power-performance-profiles.jpg)

![The image shows a selection screen for "TuneD" with three options: "Throughput-performance," "Virtual-guest," and "Balanced," each accompanied by an icon.](https://kodekloud.com/kk-media/image/upload/v1752883605/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Manage-tuning-profiles/tuned-selection-screen-options.jpg)

By default, TuneD automatically selects a profile based on the system environment. For example:

- On a high-throughput server, TuneD will choose the **throughput performance** profile.
- On a virtual machine, the **virtual guest** profile is selected.
- In all other scenarios, the **balanced** profile is used to maintain an equilibrium between performance and power consumption.

!!! note "Installing TuneD" If TuneD is not installed, use the following commands to install, enable, and verify its status:

```
sudo yum install tuned
sudo systemctl enable --now tuned
systemctl status tuned.service
```

The output confirms that TuneD is active and displays the currently active profile along with the system settings.

## TuneD Profile Locations

TuneD profiles are stored in two key locations:

- **/usr/lib/tuned:** Contains distribution-specific profiles, with each profile in its own subdirectory and its associated tuned.conf configuration file.
- **/etc/tuned:** Holds the main configuration file (`tuned-main.conf`) and any custom profiles. Profiles in this directory override those in `/usr/lib/tuned` if they share the same name.

To list the distribution-provided profiles, run:

```
ls /usr/lib/tuned
```

Sample output:

```
accelerator-performance    intel-sst              powersave
balanced                   latency-performance    recommend.d
desktop                    network-latency        throughput-performance
functions                  network-throughput     virtual-guest
hpc-compute                optimize-serial-console virtual-host
```

Similarly, check the custom profiles and main configuration file with:

```
ls /etc/tuned
```

Expected output:

```
tuned-main.conf
```

For more details on TuneD configuration options, refer to the TuneD manual page:

```
man tuned.conf
```

## Managing TuneD Profiles with tuned-adm

The TuneD ADM command-line tool simplifies the administration of TuneD. It enables you to list available profiles, view the active profile, switch between profiles, and get profile recommendations.

### Listing Profiles and Checking the Active Profile

To list available profiles and see which one is active, use:

```
tuned-adm list
```

Example output:

```
Available profiles:
- accelerator-performance   - Throughput performance based tuning with disabled higher latency STOP states
- balanced                 - General non-specialized tuned profile
- desktop                  - Optimize for the desktop use-case
- hpc-compute              - Optimize for HPC compute workloads
- intel-sst                - Configure for Intel Speed Select Base Frequency
- latency-performance      - Optimize for deterministic performance at the cost of increased power consumption
- network-latency          - Optimize for low latency network performance
- network-throughput       - Optimize for streaming network throughput
- optimize-serial-console  - Optimize for serial console use
- powersave                - Optimize for low power consumption
- throughput-performance   - Excellent performance across a variety of server workloads
- virtual-guest            - Optimize for running inside a virtual guest
- virtual-host             - Optimize for running KVM guests
Current active profile: virtual-guest
```

To view just the active profile, run:

```
tuned-adm active
```

Expected output:

```
Current active profile: virtual-guest
```

### Switching Profiles

To change the active profile, specify the new profile name. For example, to switch to the **balanced** profile:

```
tuned-adm profile balanced
```

You can also display detailed information about a profile. Running the following command without specifying a profile shows details for the current profile:

```
tuned-adm profile_info
```

Example output:

```
Profile name:
    virtual-guest
Profile summary:
    Optimize for running inside a virtual guest
Profile description:
```

### Profile Recommendation and Verification

Get a profile recommendation based on your current environment:

```
tuned-adm recommend
```

If the system suggests `virtual-guest`, then that is the recommended profile.

Verify that the system settings align with the active TuneD profile:

```
tuned-adm verify
```

Example output:

```
Verification succeeded, current system settings match the preset profile.
See the TuneD log file ('/var/log/tuned/tuned.log') for details.
```

To enable continuous monitoring and automatic profile selection, run:

```
tuned-adm auto_profile
```

For additional options or command usage, access the help menu:

```
tuned-adm --help
```

### Example: Switching Profiles on a Virtual Machine

In a virtual machine scenario, the active profile is usually `virtual-guest`. However, if you need to test a high-throughput server profile, you can list available profiles and switch accordingly:

```
tuned-adm active
```

Output:

```
Current active profile: virtual-guest
```

List profiles:

```
tuned-adm list
```

Switch to the **throughput-performance** profile:

```
tuned-adm profile throughput-performance
tuned-adm active
```

Expected active profile:

```
Current active profile: throughput-performance
```

## Merging Profiles

TuneD supports merging profiles. For instance, if you need a configuration that combines the settings of both **virtual-host** and **powersave** profiles (ideal for hosting virtual machines while conserving power), you can merge them. Note that if a conflict arises, TuneD applies the option from the last specified profile.

!!! warning "Caution" When merging profiles, ensure that settings do not conflict. For example, avoid merging performance-optimized disk settings with power-saving parameters.

## Dynamic Tuning

Static tuning applies the chosen profile settings as-is. For dynamic system tuning—where TuneD adjusts settings on the fly based on system demands—you must enable dynamic tuning via the main configuration file at `/etc/tuned/tuned-main.conf`.

By default, dynamic tuning is disabled. Verify the current state:

```
grep "dynamic_tuning" /etc/tuned/tuned-main.conf
```

Expected output:

```
dynamic_tuning = 0
```

To enable dynamic tuning, edit the configuration file (using your preferred text editor, such as Vim) and change the value from `0` to `1`:

```
sudo vi /etc/tuned/tuned-main.conf
```

Replace:

```
dynamic_tuning = 0
```

With:

```
dynamic_tuning = 1
```

After saving the changes, restart the TuneD service:

```
sudo systemctl restart tuned.service
grep "dynamic_tuning" /etc/tuned/tuned-main.conf
```

Expected output:

```
dynamic_tuning = 1
```

With dynamic tuning enabled, TuneD will continually monitor your system and adjust settings automatically to achieve optimal performance.

---

For further details, refer to the official TuneD documentation and related resources:

- [TuneD Manual](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

This guide should help you effectively manage and optimize TuneD profiles to suit your system's unique requirements.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/b8d0f7c7-7710-42e5-a184-787d78d41e6f/lesson/6ca44908-1b36-463b-b6e7-3ea279761cc8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/b8d0f7c7-7710-42e5-a184-787d78d41e6f/lesson/b648d4c1-5e68-46ba-918b-e49851ecc1f9)**
>
> Practice lab
