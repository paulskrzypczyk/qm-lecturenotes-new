---
title: "Chapter 9: Scattering" 
short_title: "Ch. 9: Scattering"
numbering:
  enumerator: 9.%s
authors:
  - name: 
    affiliations:
---

In the previous two chapters we have focused our attention on situations where a particle is bound inside a potential well. This is a situation which is very prevalent and important. In these cases, we saw that a particle can only have special discrete energies. 

Prior to this we studied a free particle — when there were no forces acting, and so far this has been the only instance of a **non-bound** state that we have considered. In this final chapter considering quantum mechanics in 1D, we will now return to a situation where a particle is non-bound, but one that is more interesting and physical than the free particle.

We will consider the situation where a particle **scatters** off of a target, which we model by a change in potential. This is a very important physical situation which arises in a wide range of situations, from neutrons scattering in condensed matter physics, to the scattering of particles off each other in particle detectors. Our goal here is to understand the basics of scattering in quantum mechanics. 

We will consider just one simple potential — an abrupt change. The motivation for studying this is somewhat similar to our motivation for studying the infinite square well. While this is far from realistic, it is simple enough that we can solve exactly for the energy eigenstates (which are now no longer momentum eigenstates, like for the free particle). We can then use these to numerically study what happens when a wavepacket scatters off of the step. 

We will uncover one final new aspect of quantum mechanics, which is almost the complete **opposite** of tunnelling. Whereas in tunnelling a quantum particle enters a region of space it should not have enough energy to enter, in this chapter we will see that quantum particles **reflect** off of abrupt changes in potential — **whether those changes are positive or negative**. That is, quantum particle reflect off of cliff edges, and therefore **fail to enter a region that they would definitely enter**. 

## The finite step potential
In this chapter we will consider the following potential function
\begin{equation}
	V(x) = \begin{cases}
	0 & \text{if } x < 0, \\
	V_0 & \text{if } x \geq 0.
\end{cases}
\end{equation}
depicted in [](#potential-step). 

````{figure} ./Pictures/potential-step.svg
:name: potential-step
:width: 400px
:align: center

**The potential step.**
     The potential energy vanishes for $x < 0$, and is equal to $V_0$ for $x \geq 0$. In the figure we have taken $V_0 > 0$, although in the mathematics that follows, we make consider $V_0$ to be either positive or negative.  
````

This corresponds to an abrupt change in potential from $V(x) = 0$ to $V(x) = V_0$ at the origin. It is important to note that $V_0$ could be either **positive** or **negative**, meaning that the potential energy either steps up or down. We will primarily keep in the back of our mind that $V_0 > 0$, but will also discuss what happens if $V_0 < 0$. 

Our goal, as always, is to find the energy eigenstates of the potential well, which we will do by solving the TISE to find the energy eigenfunctions. Since the particle isn't bound, we expect that the energy should vary **continuously** and the eigenfunctions shouldn't be physical and normalisable. We will indeed see that this is the case below. 

## Energy eigenfunctions of the potential step

The approach that we will take is going to be similar to the infinite square well — since the potential energy is specified in pieces, we will seek to solve for the energy eigenfunctions in pieces also. We will call the region to the left of the step **region I** ($x < 0$) and the region to the right of the step **region II** ($x \geq 0$). We will call the energy eigenfunctions in these regions $u_E^\rI(x)$ and $u_E^\rII(x)$ respectively, such that
```{math}
:label: e-eig-step
u_E(x) = \begin{cases}
u_E^\rI(x) &\text{ if } x < 0, \\
u_E^\rII(x) &\text{ if } x \geq 0.
\end{cases}
```
After solving for the two pieces, we will join them together using the **continuity** of energy eigenfunctions, as we did in the case of the eigenfunctions of the infinite square well (with one additional new ingredient). 

### Energy eigenfunctions in Region I

We will start off considering Region I, to the left of the step. In this region $V(x) = 0$. Therefore, just as happened inside the infinite square well in [](#s-ISW-rII),
```{math}
\op{H} = \frac{\op{P}^2}{2M}
```
and so, just as we were able to do there, we can **immediately write down the energy eigenfunction**, as this is the same Hamiltonian (and the same as the free particle also!). As we discussed in [](#s-ISW-rII), any function of the form
```{math}
\vph u_E^\rI(x) = A e^{ikx} + Be^{-ikx},
```
will be a solution, where $A$ and $B$ are arbitrary complex numbers, and 
```{math}
:label: e-k
\vph E = \frac{\hbar^2 k^2}{2M}.
```
Just as in the case of the infinite square well, we **don't yet know which superposition of $e^{ikx}$ and $e^{-ikx}$ we should take (i.e. how to choose $A$ and $B$). For the moment we will leave them general, and see that we can determine them later, using continuity. 

### Energy eigenfunctions in Region I

We now turn our attention to Region II, to the right of the step. In this region $V(x) = V_0$. In this region $\op{H} = \frac{\op{P}^2}{2M} + V_0$, and the TISE we want to solve is
```{math}
\left(\frac{\op{P}^2}{2M} + V_0\right)u_E^\rII(x) = E u_E^\rII(x).
```
We can move the term involving $V_0$ from the left-hand to the right-hand side, to express this as
```{math}
\frac{\op{P}^2}{2M}u_E^\rII(x) = (E-V_0) u_E^\rII(x).
```
Since $V_0$ is just a constant, this has again **exactly the same form as for a free particle** except we are looking for an eigenvalue of $E' = (E-V_0)$, instead of $E$. The only **subtlety** we need to be careful about is that previously we tacitly had $E\geq 0$. We will therefore **make the same assumption that $E' \geq 0$**, i.e that $E > V_0$. Physically this means we are going to consider situations where **the particle has enough energy to classically climb the potential step**. We will study the opposite situation as an exercise. 

Given the above, we can once again **write down the solution**! In particular, the energy eigenfunction in region II will be identical in form to an energy eigenfunction **without a potential** and with energy $E'$. The solution is therefore 
```{math}
\vph u_E^\rII(x) = C e^{ik'x} + De^{-ik'x},
```
where $C$ and $D$ are two new constants (that we will also need to determine in due course), and 
```{math}
:label: e-kp
\vph E - V_0 = \frac{\hbar^2 k'^2}{2M}.
```
Taking a step back (no pun intended), this makes **perfect sense**. Once the particle has passed the step, its potential energy has increased by $V_0$. The total energy is still $E$, and so the kinetic energy of the particle is now $E - V_0$. This is why we see that energy eigenfunction has exactly the same form as an energy eigenfunction with $E' = E - V_0$. 

### Left-moving and Right-moving eigenstates

Putting everyhing together that we have learnt so far, we know that the energy eigenfunctions of the potential step have the form 
```{math}
:label: e-eig-step-1
u_E(x) = \begin{cases}
A e^{ikx} + Be^{-ikx} &\text{ if } x < 0, \\
C e^{ik'x} + De^{-ik'x} &\text{ if } x \geq 0.
\end{cases}
```
where $A$, $B$, $C$ and $D$ are complex constants, that we need to determine,  and $k$ and $k'$ are functions of the energy and step height, specified via [](#e-k) and [](#e-kp) respectively. 

In order to make progress, we first need to cast our mind back to [](06-free-particle), and that fact that we found there **two degenerate eigenstates for each energy**. *What were the two degenerate eigenstates?* They were the two momentum eigenstates with equal and opposite momentum, $\ket{p}$ and $\ket{-p}$. 

Here we are going to have something **very similar**. What we need to understand is **what are the analogue of these two eigenstates here?**. The key insight is that a momentum eigenstate with **positive momentum** is moving to the right, while an eigenstate of **negative momentum** is moving to the left. We thus want to identify **right-moving** and **left-moving** eigenstates of the step. 

We will be able to do this, but we need to use a bit of **foresight**. In particular, as stated in the introduction, **quantum particles reflect off of abrupt changes in potential**, irrespective of whether that is a positive or negative change. *What does this imply about left-moving and right-moving states?* Let us start off by considering a right-moving state in region I, which would correspond to $e^{ikx}$. When it reaches the step, it will reflect, creating a component $e^{-ikx}$, and also pass through, creating a component $e^{ik'x}$ in region II. In region II however, there will be **no negative momentum component** (i.e. component of the form $e^{-ik'x}$). 

This is summarised graphically in [](#left-right-moving) (a). 

````{figure} ./Pictures/left-moving-right-moving.svg
:name: left-right-moving
:width: 500px
:align: center

**Right-moving and Left-moving situations**. (a) In a 'right-moving' situation, a particle approaches the step from the left, with positive momentum. It is then partially reflected by the step, and partially transmitted. (b) In a 'left-moving' situation, everything is reversed. The particle approaches the step from the right with negative momentum. It is then partially reflected, and partially transmitted.
````

This line of reasoning suggests that we should take $D = 0$ in [](#e-eig-step-1) when considering right-moving eigenfunctions. We will denote this eigenfunction by $u_E^\rR(x)$ ('R' for 'right-moving'), and their general form will be
```{math}
:label: e-eig-step-R
u_E^\rR(x) = \begin{cases}
A e^{ikx} + Be^{-ikx} &\text{ if } x < 0, \\
C e^{ik'x} &\text{ if } x \geq 0.
\end{cases}
```

A similar line of reasoning, which you are encouraged to think through, and which is summarised in [](#left-right-moving) (b), suggests that we should take $A = 0$ in order to define left-moving eigenfunctions, which we denote by $u_E^\rL(x)$, and have the general form
```{math}
:label: e-eig-step-1
u_E^\rL(x) = \begin{cases}
B'e^{-ikx} &\text{ if } x < 0, \\
C' e^{ik'x} + D'e^{-ik'x} &\text{ if } x \geq 0.
\end{cases}
```
(where we now use primes on the constants $B'$, $C'$ and $D'$, to highlight the fact that this is a **distinct** eigenfunction with distinct unknown parameters at this stage). 

In what follows, we will focus on **right-moving** particles, and leave the corresponding analysis of **left-moving** particles as an [exercise]().


